import type { BaseInMemoryEntitySchema, NameEntitySchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type NamedEntitySchemaMixin = NameEntitySchema;
export type NamedEntityInMemoryEntity = InMemoryEntity<BaseInMemoryEntitySchema & NamedEntitySchemaMixin>;
export declare function namedEntitySchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & NamedEntitySchemaMixin;
