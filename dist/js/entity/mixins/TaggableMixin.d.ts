import type { Constructor } from "../../utils/types";
import type { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";
export declare function taggableMixin(item: InMemoryEntity): {
    setTags(array: string[]): void;
    tags: string[];
};
export type TaggableInMemoryEntity = ReturnType<typeof taggableMixin>;
export type TaggableInMemoryEntityConstructor = Constructor<TaggableInMemoryEntity>;
export default function TaggableMixin<S extends InMemoryEntityConstructor>(superclass: S): S & TaggableInMemoryEntityConstructor;
