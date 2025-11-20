import type { MetadataSchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";

export type HasMetadataSchemaMixin = MetadataSchema;

export type HasMetadataInMemoryEntity = InMemoryEntity & HasMetadataSchemaMixin;

export function hasMetadataSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & HasMetadataSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity & HasMetadataSchemaMixin = {
        get metadata() {
            return this.prop<MetadataSchema["metadata"]>("metadata");
        },
        set metadata(value: MetadataSchema["metadata"]) {
            this.setProp("metadata", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
