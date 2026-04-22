import type { DefaultableEntitySchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type DefaultableSchemaMixin = DefaultableEntitySchema;
export type DefaultableInMemoryEntity = InMemoryEntity & DefaultableSchemaMixin;
export declare function defaultableSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & DefaultableSchemaMixin;
