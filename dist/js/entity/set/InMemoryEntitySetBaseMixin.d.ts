import { type BaseInMemoryEntitySchema, type EntitySetSchema, SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import { type InMemoryEntity } from "../in_memory";
export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];
type EntitySetEntitySchema = BaseInMemoryEntitySchema & EntitySetSchema;
export declare enum EntitySetType {
    ordered = "ordered",
    unordered = "unordered"
}
declare function schemaMixin<E extends InMemoryEntity>(item: E): InMemoryEntity<EntitySetEntitySchema> & EntitySetSchema;
type EntitySetBaseMethodsDescriptor = {
    toJSONForInclusionInEntity(): {
        _id: string;
        type: string;
    };
};
declare function methodsMixin<E extends InMemoryEntity>(item: E & EntitySetSchema): InMemoryEntity<EntitySetEntitySchema> & EntitySetSchema & EntitySetBaseMethodsDescriptor;
export type InMemoryEntitySetBase = ReturnType<typeof schemaMixin> & ReturnType<typeof methodsMixin>;
export declare function inMemoryEntitySetBaseMixin<T extends InMemoryEntity>(item: T): asserts item is T & InMemoryEntitySetBase;
export {};
