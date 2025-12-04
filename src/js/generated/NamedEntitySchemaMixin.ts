import type { NameEntitySchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";

export type NamedEntitySchemaMixin = NameEntitySchema;

export type NamedEntityInMemoryEntity = InMemoryEntity & NamedEntitySchemaMixin;

export function namedEntitySchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & NamedEntitySchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity & NamedEntitySchemaMixin = {
        get name() {
            return this.requiredProp<NameEntitySchema["name"]>("name");
        },
        set name(value: NameEntitySchema["name"]) {
            this.setProp("name", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
