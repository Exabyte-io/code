import {
    defaultRoundingOptions,
    RoundedValueWithId,
    RoundingOptions,
    ValueWithId,
} from "./ValueWithId";

export class ArrayWithIds<T> {
    values: T[];

    ids: number[];

    constructor(values: T[] = [], ids: number[] = []) {
        if (values.length !== ids.length) {
            throw new Error("Values and IDs must have the same length");
        }
        this.values = [...values];
        this.ids = [...ids];
    }

    static fromValues<U, C extends ArrayWithIds<U>>(
        this: new (values: U[], ids: number[]) => C,
        values: U[],
    ): C {
        const ids = values.map((_, i) => i);
        return new this(values, ids);
    }

    static fromObjects<U, C extends ArrayWithIds<U>>(
        this: new (values: U[], ids: number[]) => C,
        objects: { id: number; value: U }[],
    ): C {
        const values = objects.map((obj) => obj.value);
        const ids = objects.map((obj) => obj.id);
        return new this(values, ids);
    }

    toJSON(): object[] {
        return this.values.map((value, index) => ({
            id: this.ids[index],
            value:
                value !== null &&
                typeof value === "object" &&
                "toJSON" in value &&
                typeof (value as any).toJSON === "function"
                    ? (value as any).toJSON()
                    : value,
        }));
    }

    toValueWithIdArray(): ValueWithId<T>[] {
        return this.values.map((value, index) =>
            ValueWithId.fromValueAndId(value, this.ids[index]),
        );
    }

    getElementValueById(id: number): T | undefined {
        const index = this.ids.indexOf(id);
        return index !== -1 ? this.values[index] : undefined;
    }

    getElementValueByIndex(index: number): T | undefined {
        return this.values[index];
    }

    getElementIdByIndex(index: number): number | undefined {
        return this.ids[index] || undefined;
    }

    getElementIdByValue(value: T): number | undefined {
        const index = this.values.findIndex((v) =>
            Array.isArray(v) && Array.isArray(value)
                ? v.length === value.length && v.every((val, idx) => val === value[idx])
                : v === value,
        );
        return index !== -1 ? this.ids[index] : undefined;
    }

    filterByValues(valuesToKeep: T | T[]): void {
        const toHash = (v: any) => (Array.isArray(v) ? JSON.stringify(v) : String(v));
        const keepSet = new Set(
            Array.isArray(valuesToKeep) ? valuesToKeep.map(toHash) : [toHash(valuesToKeep)],
        );

        const filtered = this.values
            .map((value, i) => [value, this.ids[i]] as [T, number])
            .filter(([value]) => keepSet.has(toHash(value)));

        this.values = filtered.map(([v]) => v);
        this.ids = filtered.map(([_, id]) => id);
    }

    filterByIndices(indices: number | number[]): void {
        const keepSet = new Set(Array.isArray(indices) ? indices : [indices]);
        this.values = this.values.filter((_, i) => keepSet.has(i));
        this.ids = this.ids.filter((_, i) => keepSet.has(i));
    }

    filterByIds(ids: number | number[], invert = false): void {
        const idSet = new Set(Array.isArray(ids) ? ids : [ids]);
        const keep = invert
            ? this.ids.map((id, i) => (idSet.has(id) ? -1 : i)).filter((i) => i >= 0)
            : this.ids.map((id, i) => (idSet.has(id) ? i : -1)).filter((i) => i >= 0);

        this.values = keep.map((i) => this.values[i]);
        this.ids = keep.map((i) => this.ids[i]);
    }

    equals(other: ArrayWithIds<T>): boolean {
        if (!(other instanceof ArrayWithIds)) return false;
        if (this.values.length !== other.values.length) return false;
        if (this.ids.length !== other.ids.length) return false;

        return (
            this.values.every((v, i) => {
                const ov = other.values[i];
                return Array.isArray(v) && Array.isArray(ov)
                    ? v.length === ov.length && v.every((val, idx) => val === ov[idx])
                    : v === ov;
            }) && this.ids.every((id, i) => id === other.ids[i])
        );
    }

    mapArrayInPlace(func: (value: T) => T): void {
        this.values = this.values.map(func);
    }

    addItem(value: T, id?: number): void {
        const newId = id ?? Math.max(-1, ...this.ids) + 1;
        this.values.push(value);
        this.ids.push(newId);
    }

    removeItem(index: number, id?: number): void {
        if (id !== undefined) {
            index = this.ids.indexOf(id);
            if (index === -1) throw new Error("ID not found");
        }

        if (index < 0 || index >= this.values.length) {
            throw new Error("Index out of range");
        }

        this.values.splice(index, 1);
        this.ids.splice(index, 1);
    }
}

export class RoundedArrayWithIds<T> extends ArrayWithIds<T> {
    readonly roundingOptions: RoundingOptions;

    constructor(
        values: T[] = [],
        ids: number[] = [],
        options: RoundingOptions = defaultRoundingOptions,
    ) {
        super(values, ids);
        this.roundingOptions = options;
    }

    override toJSON(): object[] {
        return this.values.map((value, index) =>
            new RoundedValueWithId(this.ids[index], value, this.roundingOptions).toJSON(),
        );
    }
}
