import type { MetadataSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

type Metadata = MetadataSchema["metadata"];

type HasMetadataSchema<M extends Metadata = Metadata> = {
    metadata?: M;
};

export type HasMetadata<M extends Metadata = Metadata> = HasMetadataSchema<M> & {
    updateMetadata: (object: M) => void;
};

export type HasMetadataInMemoryEntityConstructor<T extends Metadata = Metadata> = Constructor<
    HasMetadata<T>
>;

function hasMetadataPropertiesMixin<T extends InMemoryEntity, M extends Metadata = Metadata>(
    item: T,
): asserts item is T & HasMetadata<M> {
    // @ts-expect-error
    const properties: InMemoryEntity<HasMetadataSchema<M>> & HasMetadata<M> = {
        get metadata() {
            return this.prop("metadata");
        },
        set metadata(value: M | undefined) {
            this.setProp("metadata", value);
        },
        updateMetadata(object: M) {
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
