import { type EntitySetSchema, SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { type InMemoryEntity } from "../in_memory";
export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];
declare function schemaMixin<E extends InMemoryEntity>(item: E): {
    readonly isEntitySet: boolean;
    readonly entitySetType: undefined;
    readonly entityCls: undefined;
};
declare function methodsMixin<E extends InMemoryEntity>(item: E & EntitySetSchema): {
    readonly cls: string;
    toJSONForInclusionInEntity(): {
        _id: string;
        type: string;
    };
};
export declare function inMemoryEntitySetBaseMixin<T extends InMemoryEntity>(item: T): void;
export type InMemoryEntitySetBase = ReturnType<typeof schemaMixin> & ReturnType<typeof methodsMixin>;
export type InMemoryEntitySetBaseConstructor = Constructor<InMemoryEntitySetBase>;
type Base = Constructor<InMemoryEntity>;
export default function InMemoryEntitySetBaseMixin<S extends Base = Base>(superclass: S): S & InMemoryEntitySetBaseConstructor;
export {};
