import { RoundingOptions, ValueWithId } from "./ValueWithId";
export declare class ArrayWithIds<T> {
    values: T[];
    ids: number[];
    constructor(values?: T[], ids?: number[]);
    static fromValues<U, C extends ArrayWithIds<U>>(this: new (values: U[], ids: number[]) => C, values: U[]): C;
    static fromObjects<U, C extends ArrayWithIds<U>>(this: new (values: U[], ids: number[]) => C, objects: {
        id: number;
        value: U;
    }[]): C;
    toJSON(): object[];
    toValueWithIdArray(): ValueWithId<T>[];
    getElementValueById(id: number): T | undefined;
    getElementValueByIndex(index: number): T | undefined;
    getElementIdByValue(value: T): number | undefined;
    filterByValues(valuesToKeep: T | T[]): void;
    filterByIndices(indices: number | number[]): void;
    filterByIds(ids: number | number[], invert?: boolean): void;
    equals(other: ArrayWithIds<T>): boolean;
    mapArrayInPlace(func: (value: T) => T): void;
    addItem(value: T, id?: number): void;
    removeItem(index: number, id?: number): void;
}
export declare class RoundedArrayWithIds<T> extends ArrayWithIds<T> {
    readonly roundingOptions: RoundingOptions;
    constructor(values?: T[], ids?: number[], options?: RoundingOptions);
    toJSON(): object[];
}
