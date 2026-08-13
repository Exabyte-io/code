import type { BaseInMemoryEntitySchema, DescriptionSchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";

export type HasDescriptionSchemaMixin = DescriptionSchema;

export type HasDescriptionInMemoryEntity = InMemoryEntity<
    BaseInMemoryEntitySchema & HasDescriptionSchemaMixin
>;

export function hasDescriptionSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & HasDescriptionSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<HasDescriptionSchemaMixin> & HasDescriptionSchemaMixin = {
        get description() {
            return this.prop("description");
        },
        set description(value: DescriptionSchema["description"]) {
            this.setProp("description", value);
        },
        get descriptionObject() {
            return this.prop("descriptionObject");
        },
        set descriptionObject(value: DescriptionSchema["descriptionObject"]) {
            this.setProp("descriptionObject", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
