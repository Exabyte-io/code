import { type TaggableSchemaMixin, taggableSchemaMixin } from "../../generated/TaggableSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

type TaggableProperties = {
    setTags: (array: string[]) => void;
};

export type Taggable = TaggableSchemaMixin & TaggableProperties;

export type TaggableInMemoryEntity = Taggable;

export type TaggableInMemoryEntityConstructor = Constructor<TaggableInMemoryEntity>;

export function taggableMixin<T extends InMemoryEntity>(item: T): asserts item is T & Taggable {
    taggableSchemaMixin(item);

    // @ts-expect-error
    const properties: InMemoryEntity & Taggable = {
        setTags(array: string[]) {
            this.tags = array.filter((value, index, self) => self.indexOf(value) === index);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
