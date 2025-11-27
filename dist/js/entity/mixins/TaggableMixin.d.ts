import { type TaggableSchemaMixin } from "../../generated/TaggableSchemaMixin";
import { InMemoryEntity } from "../in_memory";
type TaggableProperties = {
    setTags: (array: string[]) => void;
};
export type Taggable = TaggableSchemaMixin & TaggableProperties;
export declare function taggableMixin<T extends InMemoryEntity>(item: T): asserts item is T & Taggable;
export {};
