import type { RuntimeItemsNameObjectSchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type RuntimeItemsSchemaMixin = RuntimeItemsNameObjectSchema;
export type RuntimeItemsInMemoryEntity = InMemoryEntity & RuntimeItemsSchemaMixin;
export declare function runtimeItemsSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & RuntimeItemsSchemaMixin;
