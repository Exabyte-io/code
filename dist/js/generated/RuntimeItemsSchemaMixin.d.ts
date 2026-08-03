import type { BaseInMemoryEntitySchema, RuntimeItemsSchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type RuntimeItemsSchemaMixin = RuntimeItemsSchema;
export type RuntimeItemsInMemoryEntity = InMemoryEntity<BaseInMemoryEntitySchema & RuntimeItemsSchemaMixin>;
export declare function runtimeItemsSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & RuntimeItemsSchemaMixin;
