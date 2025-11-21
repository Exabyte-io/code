import type { RuntimeItemsNameObjectSchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type RuntimeItemsNameObjectSchemaMixin = RuntimeItemsNameObjectSchema;
export type RuntimeItemsNameObjectInMemoryEntity = InMemoryEntity & RuntimeItemsNameObjectSchemaMixin;
export declare function runtimeItemsNameObjectSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & RuntimeItemsNameObjectSchemaMixin;
