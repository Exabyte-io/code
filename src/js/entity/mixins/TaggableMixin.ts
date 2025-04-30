import type { EntityTagsSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "src/js/utils/types";

import type { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";

function schemaMixin(item: InMemoryEntity) {
    const schema = {
        get tags(): string[] {
            return item.prop("tags", []);
        },
        set tags(array: string[]) {
            item.setProp("tags", array);
        },
    } satisfies EntityTagsSchema;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));

    return schema;
}

function propertiesMixin(item: InMemoryEntity & EntityTagsSchema) {
    const properties = {
        setTags(array: string[]) {
            item.tags = array.filter((value, index, self) => self.indexOf(value) === index);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export function taggableMixin(item: InMemoryEntity) {
    return {
        ...schemaMixin(item),
        ...propertiesMixin(item),
    };
}

export type TaggableInMemoryEntity = ReturnType<typeof taggableMixin>;
export type TaggableInMemoryEntityConstructor = Constructor<TaggableInMemoryEntity>;

export default function TaggableMixin<S extends InMemoryEntityConstructor>(superclass: S) {
    class TaggableMixin extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);
            taggableMixin(this);
        }
    }

    return TaggableMixin as S & TaggableInMemoryEntityConstructor;
}
