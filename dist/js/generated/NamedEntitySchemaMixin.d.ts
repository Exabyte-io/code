import type { NameEntitySchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type NamedEntitySchemaMixin = NameEntitySchema;
export declare function namedEntitySchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & NamedEntitySchemaMixin;
