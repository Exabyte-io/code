import type { RuntimeItemsStringSchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type RuntimeItemsStringSchemaMixin = RuntimeItemsStringSchema;
export type RuntimeItemsStringInMemoryEntity = InMemoryEntity & RuntimeItemsStringSchemaMixin;
export declare function runtimeItemsStringSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & RuntimeItemsStringSchemaMixin;
