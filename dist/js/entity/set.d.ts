import { InMemoryEntity } from "./in_memory";
declare const InMemoryEntitySet_base: typeof InMemoryEntity & import("./set/InMemoryEntitySetBaseMixin").InMemoryEntitySetBaseConstructor & (new (...args: any[]) => {
    inSet: import("./set/InMemoryEntityInSetMixin").InSet[];
}) & (new (...args: any[]) => {
    getInSetFilteredByCls(cls: string): {
        _id: string;
        cls?: string;
        slug?: string;
        type?: string;
        index?: number;
    }[];
    readonly parentEntitySetReference: {
        _id: string;
        cls?: string;
        slug?: string;
        type?: string;
        index?: number;
    } | undefined;
}) & import("./set/InMemoryEntitySetMixin").InMemoryEntitySetConstructor;
export declare class InMemoryEntitySet extends InMemoryEntitySet_base {
}
export {};
