import type { HashedSchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";

export type HashedSchemaMixin = HashedSchema;

export function hashedSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & HashedSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<HashedSchemaMixin> & HashedSchemaMixin = {
        get hash() {
            return this.requiredProp("hash");
        },
        set hash(value: HashedSchema["hash"]) {
            this.setProp("hash", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
