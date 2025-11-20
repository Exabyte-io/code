import type { HasConsistencyCheckSchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";

export type HasConsistencyChecksSchemaMixin = HasConsistencyCheckSchema;

export type HasConsistencyChecksInMemoryEntity = InMemoryEntity & HasConsistencyChecksSchemaMixin;

export function hasConsistencyChecksSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & HasConsistencyChecksSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity & HasConsistencyChecksSchemaMixin = {
        get consistencyChecks() {
            return this.prop<HasConsistencyCheckSchema["consistencyChecks"]>("consistencyChecks");
        },
        set consistencyChecks(value: HasConsistencyCheckSchema["consistencyChecks"]) {
            this.setProp("consistencyChecks", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
