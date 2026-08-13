import type { BaseInMemoryEntitySchema, EntityTagsSchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";

export type TaggableSchemaMixin = EntityTagsSchema;

export type TaggableInMemoryEntity = InMemoryEntity<BaseInMemoryEntitySchema & TaggableSchemaMixin>;

export function taggableSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & TaggableSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<TaggableSchemaMixin> & TaggableSchemaMixin = {
        get tags() {
            return this.prop("tags");
        },
        set tags(value: EntityTagsSchema["tags"]) {
            this.setProp("tags", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
