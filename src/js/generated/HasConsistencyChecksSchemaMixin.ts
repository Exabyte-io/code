import type { HasConsistencyCheckSchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";

export type HasConsistencyChecksSchemaMixin = HasConsistencyCheckSchema;

export function hasConsistencyChecksSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & HasConsistencyChecksSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<HasConsistencyChecksSchemaMixin> &
        HasConsistencyChecksSchemaMixin = {
        get consistencyChecks() {
            return this.prop("consistencyChecks");
        },
        set consistencyChecks(value: HasConsistencyCheckSchema["consistencyChecks"]) {
            this.setProp("consistencyChecks", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
