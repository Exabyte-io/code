import { type BaseInMemoryEntitySchema, type EntitySetSchema, SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import { type InMemoryEntity } from "../in_memory";
export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];
type EntitySetEntitySchema = BaseInMemoryEntitySchema & EntitySetSchema;
export declare enum EntitySetType {
    ordered = "ordered",
    unordered = "unordered"
}
type EntitySetBaseMethodsDescriptor = {
    toJSONForInclusionInEntity(): {
        _id: string;
        type: string;
    };
};
/** Mixin shape only — safe to merge into schema-generic subclasses (no baked-in `_json`). */
export type InMemoryEntitySetBaseMixin = EntitySetSchema & EntitySetBaseMethodsDescriptor;
/** Instance type with default entity-set schema (includes `InMemoryEntity<_json>`). */
export type InMemoryEntitySetBase = InMemoryEntity<EntitySetEntitySchema> & InMemoryEntitySetBaseMixin;
export declare function inMemoryEntitySetBaseMixin<T extends InMemoryEntity>(item: T): asserts item is T & InMemoryEntitySetBaseMixin;
export {};
