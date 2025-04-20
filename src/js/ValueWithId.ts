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

    static fromValueAndId<U>(value: U, id = 0): ValueWithId<U> {
        return new ValueWithId<U>({ id, value });
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
    equals(other: ValueWithId<T>): boolean {
        if (!(other instanceof ValueWithId)) {
            return false;
        }

        if (Array.isArray(this.value) && Array.isArray(other.value)) {
            if (this.value.length !== other.value.length) {
                return false;
            }

            for (let i = 0; i < this.value.length; i++) {
                if (this.value[i] !== other.value[i]) {
                    return false;
                }
            }

            return this.id === other.id;
        }

        return this.id === other.id && this.value === other.value;
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
