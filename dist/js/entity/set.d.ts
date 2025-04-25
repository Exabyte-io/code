import { InMemoryEntity } from "./in_memory";
declare const InMemoryEntitySet_base: typeof InMemoryEntity & (new (...args: any[]) => {
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
    get isEntitySet(): boolean | undefined;
    get entitySetType(): string | undefined;
    get entityCls(): string | undefined;
    get cls(): string;
    toJSONForInclusionInEntity(): {
        _id: string;
        type: string;
    };
}
export {};
