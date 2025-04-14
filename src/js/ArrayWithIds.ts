import { ValueWithId } from "./ValueWithId";

/**
 * Represents an array of values with associated IDs.
 */
export class ArrayWithIds<T> {
    constructor(public values: T[] = [], public ids: number[] = []) {
        // Ensure ids array is the same length as values array
        if (values.length !== ids.length) {
            throw new Error("Values and IDs arrays must have the same length");
        }
    }

    /**
     * Creates an ArrayWithIds instance from a list of values.
     * Automatically assigns sequential IDs starting from 0.
     */
    static fromValues<T>(values: T[]): ArrayWithIds<T> {
        try {
            const ids = Array.from({ length: values.length }, (_, i) => i);
            return new ArrayWithIds(values, ids);
        } catch (error) {
            throw new Error("Values must be an array");
        }
    }

    /**
     * Extracts values and ids from an array of objects with 'id' and 'value' properties.
     */
    static getValuesAndIdsFromListOfDicts<T>(
        listOfDicts: Array<{ id: number; value: T }>,
    ): [T[], number[]] {
        try {
            const values = listOfDicts.map((item) => item.value);
            const ids = listOfDicts.map((item) => item.id);
            return [values, ids];
        } catch (error) {
            throw new Error("List of dictionaries must contain 'id' and 'value' keys");
        }
    }

    /**
     * Creates an ArrayWithIds instance from an array of objects with 'id' and 'value' properties.
     */
    static fromListOfDicts<T>(listOfDicts: Array<{ id: number; value: T }>): ArrayWithIds<T> {
        try {
            const [values, ids] = ArrayWithIds.getValuesAndIdsFromListOfDicts(listOfDicts);
            return new ArrayWithIds(values, ids);
        } catch (error) {
            throw new Error("List of dictionaries must contain 'id' and 'value' keys");
        }
    }

    /**
     * Converts the instance to an array of objects with 'id' and 'value' properties.
     */
    toDict(): Array<{ id: number; value: any }> {
        return this.toArrayOfValuesWithIds().map((x) => x.toDict());
    }

    /**
     * Converts the instance to a JSON string.
     */
    toJson(): string {
        return JSON.stringify(this.toDict());
    }

    /**
     * Converts the instance to an array of ValueWithId objects.
     */
    toArrayOfValuesWithIds(): ValueWithId<T>[] {
        return this.values.map((value, index) => new ValueWithId(this.ids[index], value));
    }

    /**
     * Gets the value at the specified index.
     */
    getElementValueByIndex(index: number): T | undefined {
        return index < this.values.length ? this.values[index] : undefined;
    }

    /**
     * Gets the ID associated with a specific value.
     */
    getElementIdByValue(value: T): number | undefined {
        const index = this.values.findIndex((v) => {
            if (Array.isArray(v) && Array.isArray(value)) {
                if (v.length !== (value as any).length) return false;
                for (let i = 0; i < v.length; i++) {
                    if (v[i] !== (value as any)[i]) return false;
                }
                return true;
            }
            return v === value;
        });

        return index !== -1 ? this.ids[index] : undefined;
    }

    /**
     * Filters the instance to only include items with values in the specified list.
     */
    filterByValues(valuesToKeep: T | T[]): void {
        const makeHashable = (value: any): string => {
            return Array.isArray(value) ? JSON.stringify(value) : String(value);
        };

        const valuesToKeepSet = new Set(
            Array.isArray(valuesToKeep)
                ? valuesToKeep.map(makeHashable)
                : [makeHashable(valuesToKeep)],
        );

        const filteredItems: [T, number][] = [];

        for (let i = 0; i < this.values.length; i++) {
            const hashedValue = makeHashable(this.values[i]);
            if (valuesToKeepSet.has(hashedValue)) {
                filteredItems.push([this.values[i], this.ids[i]]);
            }
        }

        if (filteredItems.length > 0) {
            this.values = filteredItems.map(([value]) => value);
            this.ids = filteredItems.map(([_, id]) => id);
        } else {
            this.values = [];
            this.ids = [];
        }
    }

    /**
     * Filters the instance to only include items at the specified indices.
     */
    filterByIndices(indices: number | number[]): void {
        const indexSet = new Set(Array.isArray(indices) ? indices : [indices]);
        const newValues: T[] = [];
        const newIds: number[] = [];

        for (let i = 0; i < this.values.length; i++) {
            if (indexSet.has(i)) {
                newValues.push(this.values[i]);
                newIds.push(this.ids[i]);
            }
        }

        this.values = newValues;
        this.ids = newIds;
    }

    /**
     * Filters the instance to only include items with the specified IDs.
     */
    filterByIds(ids: number | number[], invert = false): void {
        const idsArray = Array.isArray(ids) ? ids : [ids];
        const idsSet = invert
            ? new Set(this.ids.filter((id) => !idsArray.includes(id)))
            : new Set(idsArray);

        const keepIndices = this.ids
            .map((id, index) => (idsSet.has(id) ? index : -1))
            .filter((index) => index !== -1);

        this.values = keepIndices.map((index) => this.values[index]);
        this.ids = keepIndices.map((index) => this.ids[index]);
    }

    /**
     * Checks if this instance is equal to another ArrayWithIds.
     */
    equals(other: ArrayWithIds<T>): boolean {
        if (!(other instanceof ArrayWithIds)) {
            return false;
        }

        if (this.values.length !== other.values.length || this.ids.length !== other.ids.length) {
            return false;
        }

        for (let i = 0; i < this.values.length; i++) {
            // Compare arrays element by element
            if (Array.isArray(this.values[i]) && Array.isArray(other.values[i])) {
                const a = this.values[i] as any[];
                const b = other.values[i] as any[];

                if (a.length !== b.length) {
                    return false;
                }

                for (let j = 0; j < a.length; j++) {
                    if (a[j] !== b[j]) {
                        return false;
                    }
                }
            } else if (this.values[i] !== other.values[i]) {
                return false;
            }

            if (this.ids[i] !== other.ids[i]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Applies a transformation function to all values in place.
     */
    mapArrayInPlace(func: (value: T) => T): void {
        this.values = this.values.map(func);
    }

    /**
     * Adds a new item to the array.
     */
    addItem(element: T, id?: number): void {
        const newId = id !== undefined ? id : Math.max(...this.ids, -1) + 1;
        this.values.push(element);
        this.ids.push(newId);
    }

    /**
     * Removes an item by index or ID.
     */
    removeItem(index: number, id?: number): void {
        if (id !== undefined) {
            index = this.ids.indexOf(id);
            if (index === -1) {
                throw new Error("ID not found in the list");
            }
        }

        if (index < this.values.length) {
            this.values.splice(index, 1);
            this.ids.splice(index, 1);
        } else {
            throw new Error("Index out of range");
        }
    }
}
