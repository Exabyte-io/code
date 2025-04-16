import { InMemoryEntity } from "./in_memory";
declare const InMemoryEntitySet_base: typeof InMemoryEntity & import("../utils/types").Constructor<InMemoryEntity & {
    inSet: import("./set/InMemoryEntityInSetMixin").InSet[];
}> & import("../utils/types").Constructor<InMemoryEntity & {
    inSet: import("./set/InMemoryEntityInSetMixin").InSet[];
} & {
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
}> & import("../utils/types").Constructor<InMemoryEntity & {
    inSet: import("./set/InMemoryEntityInSetMixin").InSet[];
} & {
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
} & {
    containsEntity<T extends import("@mat3ra/esse/dist/js/types").SystemInSetSchema>(entity?: T | undefined): boolean;
}>;
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
