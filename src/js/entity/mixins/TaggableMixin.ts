import type { Constructor } from "src/js/utils/types";

import { type TaggableSchemaMixin, taggableSchemaMixin } from "../../generated/TaggableSchemaMixin";
import { InMemoryEntity } from "../in_memory";

type TaggableProperties = {
    setTags: (array: string[]) => void;
};

export type Taggable = TaggableSchemaMixin & TaggableProperties;

export type TaggableInMemoryEntityConstructor = Constructor<Taggable>;

function taggablePropertiesMixin<T extends InMemoryEntity>(item: T): asserts item is T & Taggable {
    // @ts-expect-error
    const properties: InMemoryEntity & Taggable = {
        setTags(array: string[]) {
            this.tags = array.filter((value, index, self) => self.indexOf(value) === index);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export function taggableMixin<T extends InMemoryEntity>(item: T): asserts item is T & Taggable {
    taggableSchemaMixin(item);
    taggablePropertiesMixin(item);
}
