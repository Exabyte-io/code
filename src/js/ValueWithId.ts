import { ObjectWithIdAndValueSchema } from "@mat3ra/esse/dist/js/types";

import { math, RoundingMethodEnum } from "./math";

interface ValueWithIdSchema<T> {
    id: ObjectWithIdAndValueSchema["id"];
    value: T | null;
}

export class ValueWithId<T> {
    id: number;

    value: T | null;

    static defaultConfig = {
        id: 0,
        value: null,
    };

    static fromValueAndId<U, C extends ValueWithId<U>>(
        this: new (args: { id: number; value: U }) => C,
        value: U,
        id = 0,
    ): C {
        return new this({ id, value });
    }

    constructor({ id, value }: ValueWithIdSchema<T> = ValueWithId.defaultConfig) {
        this.id = id;
        this.value = value;
    }

    /**
     * Converts the instance to a plain JavaScript object.
     */
    toJSON(): object {
        if (
            this.value !== null &&
            typeof this.value === "object" &&
            "toJSON" in this.value &&
            typeof (this.value as any).toJSON === "function"
        ) {
            return { id: this.id, value: (this.value as any).toJSON() };
        }
        return { id: this.id, value: this.value };
    }

    /**
     * Checks if this instance is equal to another ValueWithId.
     */
    equals<U>(other: ValueWithId<U>): boolean {
        if (!(other instanceof ValueWithId)) return false;

        // because U may differ from T, we cast to unknown when comparing
        const v1 = this.value as unknown;
        const v2 = other.value as unknown;

        if (Array.isArray(v1) && Array.isArray(v2)) {
            if (v1.length !== v2.length) return false;
            for (let i = 0; i < v1.length; i++) {
                if (v1[i] !== v2[i]) return false;
            }
            return this.id === other.id;
        }

        return this.id === other.id && v1 === v2;
    }
}

export interface RoundingOptions {
    precision: number;
    roundingMethod: RoundingMethodEnum;
}

export const defaultRoundingOptions: RoundingOptions = {
    precision: 9,
    roundingMethod: RoundingMethodEnum.HalfAwayFromZero,
};

export class RoundedValueWithId<T> extends ValueWithId<T> {
    readonly precision: number;

    readonly roundingMethod: RoundingMethodEnum;

    constructor(id: number, value: T, options: RoundingOptions = defaultRoundingOptions) {
        super({ id, value });
        this.precision = options.precision;
        this.roundingMethod = options.roundingMethod;
    }

    override toJSON(): object {
        return {
            id: this.id,
            value: math.roundArrayOrNumber(this.value, this.precision, this.roundingMethod),
        };
    }
}
