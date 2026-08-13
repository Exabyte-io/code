import type { BaseInMemoryEntitySchema, HashedSchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type HashedSchemaMixin = HashedSchema;
export type HashedInMemoryEntity = InMemoryEntity<BaseInMemoryEntitySchema & HashedSchemaMixin>;
export declare function hashedSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & HashedSchemaMixin;
