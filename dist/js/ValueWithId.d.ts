import { ObjectWithIdAndValueSchema } from "@mat3ra/esse/dist/js/types";
import { RoundingMethodEnum } from "./math";
interface ValueWithIdSchema<T> {
    id: ObjectWithIdAndValueSchema["id"];
    value: T | null;
}
export declare class ValueWithId<T> {
    id: number;
    value: T | null;
    static defaultConfig: {
        id: number;
        value: null;
    };
    static fromValueAndId<U, C extends ValueWithId<U>>(this: new (args: {
        id: number;
        value: U;
    }) => C, value: U, id?: number): C;
    constructor({ id, value }?: ValueWithIdSchema<T>);
    /**
     * Converts the instance to a plain JavaScript object.
     */
    toJSON(): object;
    /**
     * Checks if this instance is equal to another ValueWithId.
     */
    equals<U>(other: ValueWithId<U>): boolean;
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
export {};
