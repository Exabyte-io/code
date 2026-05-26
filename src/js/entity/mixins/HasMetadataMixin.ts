import type { MetadataSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

type Metadata = MetadataSchema["metadata"];

export type HasMetadata<T extends Metadata = Metadata> = {
    metadata?: T;
    updateMetadata: (object: Partial<T>) => void;
};

export type HasMetadataInMemoryEntityConstructor<T extends Metadata = Metadata> = Constructor<
    HasMetadata<T>
>;

function hasMetadataPropertiesMixin<T extends InMemoryEntity, M extends Metadata = Metadata>(
    item: T,
): asserts item is T & HasMetadata {
    // @ts-expect-error
    const properties: InMemoryEntity & HasMetadata<M> = {
        get metadata() {
            return this.prop<M>("metadata");
        },
        set metadata(value: M | undefined) {
            this.setProp("metadata", value);
        },
        updateMetadata(object: Partial<M>) {
            this.setProp("metadata", { ...this.metadata, ...object });
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export function hasMetadataMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & HasMetadata {
    hasMetadataPropertiesMixin(item);
}
