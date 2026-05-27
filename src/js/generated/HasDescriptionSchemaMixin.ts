import type { DescriptionSchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";

export type HasDescriptionSchemaMixin = DescriptionSchema;

export type HasDescriptionInMemoryEntity = InMemoryEntity & HasDescriptionSchemaMixin;

export function hasDescriptionSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & HasDescriptionSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity & HasDescriptionSchemaMixin = {
        get description() {
            return this.prop<DescriptionSchema["description"]>("description");
        },
        set description(value: DescriptionSchema["description"]) {
            this.setProp("description", value);
        },
        get descriptionObject() {
            return this.prop<DescriptionSchema["descriptionObject"]>("descriptionObject");
        },
        set descriptionObject(value: DescriptionSchema["descriptionObject"]) {
            this.setProp("descriptionObject", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
