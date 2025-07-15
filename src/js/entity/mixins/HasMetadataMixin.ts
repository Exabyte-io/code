import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

export function hasMetadataMixin<T extends InMemoryEntity>(item: T) {
    // @ts-expect-error
    const properties: InMemoryEntity & HasMetadataInMemoryEntity = {
        get metadata(): object {
            return this.prop("metadata", {});
        },
        set metadata(object: object) {
            this.setProp("metadata", object);
        },
        updateMetadata(object: object) {
            this.metadata = { ...this.metadata, ...object };
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export type HasMetadataInMemoryEntity = {
    metadata: object;
    updateMetadata: (object: object) => void;
};

export type HasMetadataInMemoryEntityConstructor = Constructor<HasMetadataInMemoryEntity>;
