import type { BaseInMemoryEntitySchema, HasConsistencyCheckSchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type HasConsistencyChecksSchemaMixin = HasConsistencyCheckSchema;
export type HasConsistencyChecksInMemoryEntity = InMemoryEntity<BaseInMemoryEntitySchema & HasConsistencyChecksSchemaMixin>;
export declare function hasConsistencyChecksSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & HasConsistencyChecksSchemaMixin;
