import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
export declare function taggableMixin<T extends InMemoryEntity>(item: T): InMemoryEntity & TaggableInMemoryEntity;
export type TaggableInMemoryEntity = {
    tags: string[];
    setTags: (array: string[]) => void;
};
export type TaggableInMemoryEntityConstructor = Constructor<TaggableInMemoryEntity>;
