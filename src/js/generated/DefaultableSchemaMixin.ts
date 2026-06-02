import type { DefaultableEntitySchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";

export type DefaultableSchemaMixin = DefaultableEntitySchema;

export type DefaultableInMemoryEntity = InMemoryEntity & DefaultableSchemaMixin;

export function defaultableSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & DefaultableSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<DefaultableSchemaMixin> & DefaultableSchemaMixin = {
        get isDefault() {
            return this.prop("isDefault");
        },
        set isDefault(value: DefaultableEntitySchema["isDefault"]) {
            this.setProp("isDefault", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
