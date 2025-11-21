import { type TaggableSchemaMixin } from "../../generated/TaggableSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
type TaggableProperties = {
    setTags: (array: string[]) => void;
};
type Taggable = TaggableSchemaMixin & TaggableProperties;
export declare function taggableMixin<T extends InMemoryEntity>(item: T): asserts item is T & Taggable;
export type TaggableInMemoryEntity = TaggableSchemaMixin & TaggableProperties;
export type TaggableInMemoryEntityConstructor = Constructor<TaggableInMemoryEntity>;
export {};
