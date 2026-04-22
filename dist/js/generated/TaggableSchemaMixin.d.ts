import type { EntityTagsSchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type TaggableSchemaMixin = EntityTagsSchema;
export type TaggableInMemoryEntity = InMemoryEntity & TaggableSchemaMixin;
export declare function taggableSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & TaggableSchemaMixin;
