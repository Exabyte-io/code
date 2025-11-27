import {
    type HasMetadataSchemaMixin,
    hasMetadataSchemaMixin,
} from "../../generated/HasMetadataSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

type HasMetadataProperties = {
    updateMetadata: (object: object) => void;
};

export type HasMetadata = HasMetadataSchemaMixin & HasMetadataProperties;

export type HasMetadataInMemoryEntityConstructor = Constructor<HasMetadata>;

function hasMetadataPropertiesMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & HasMetadata {
    // @ts-expect-error
    const properties: InMemoryEntity & HasMetadata = {
        updateMetadata(object: object) {
            this.setProp("metadata", { ...this.metadata, ...object });
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export function hasMetadataMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & HasMetadata {
    hasMetadataSchemaMixin(item);
    hasMetadataPropertiesMixin(item);
}
