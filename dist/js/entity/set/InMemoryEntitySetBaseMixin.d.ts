import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { type InMemoryEntity } from "../in_memory";
export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];
export declare function inMemoryEntitySetBaseMixin<T extends InMemoryEntity>(item: T): {
    readonly isEntitySet: boolean | undefined;
    readonly entitySetType: string | undefined;
    readonly entityCls: string | undefined;
    readonly cls: string;
    toJSONForInclusionInEntity(): {
        _id: string;
        type: string;
    };
};
export type InMemoryEntitySetBase = ReturnType<typeof inMemoryEntitySetBaseMixin>;
export type InMemoryEntitySetBaseConstructor = Constructor<InMemoryEntitySetBase>;
type Base = Constructor<InMemoryEntity>;
export default function InMemoryEntitySetBaseMixin<S extends Base = Base>(superclass: S): S & InMemoryEntitySetBaseConstructor;
export {};
