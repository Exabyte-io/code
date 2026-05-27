import type { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type InSetSchemaMixin = SystemInSetSchema;
export type InSetInMemoryEntity = InMemoryEntity & InSetSchemaMixin;
export declare function inSetSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & InSetSchemaMixin;
