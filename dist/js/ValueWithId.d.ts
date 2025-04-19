import { RoundingMethodEnum } from "./math";
export declare class ValueWithId<T> {
    id: number;
    value: T | null;
    constructor(id?: number, value?: T | null);
    /**
     * Converts the instance to a plain JavaScript object.
     */
    toJSON(): object;
    /**
     * Checks if this instance is equal to another ValueWithId.
     */
    equals(other: ValueWithId<T>): boolean;
}
export interface RoundingOptions {
    precision: number;
    roundingMethod: RoundingMethodEnum;
}
export declare const defaultRoundingOptions: RoundingOptions;
export declare class RoundedValueWithId<T> extends ValueWithId<T> {
    readonly precision: number;
    readonly roundingMethod: RoundingMethodEnum;
    constructor(id: number, value: T, options?: RoundingOptions);
    toJSON(): object;
}
