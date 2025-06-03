import type { MetadataSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";

function schemaMixin(item: InMemoryEntity) {
    const schema = {
        get metadata(): object {
            return item.prop("metadata", {});
        },
        set metadata(object: object) {
            item.setProp("metadata", object);
        },
    } satisfies MetadataSchema;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));

    return schema;
}

function propertiesMixin(item: InMemoryEntity & MetadataSchema) {
    const properties = {
        updateMetadata(object: object) {
            item.metadata = { ...item.metadata, ...object };
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export function hasMetadataMixin(item: InMemoryEntity) {
    return {
        ...schemaMixin(item),
        ...propertiesMixin(item),
    };
}

export type HasMetadataInMemoryEntity = ReturnType<typeof hasMetadataMixin>;
export type HasMetadataInMemoryEntityConstructor = Constructor<HasMetadataInMemoryEntity>;

export default function HasMetadataMixin<S extends InMemoryEntityConstructor>(superclass: S) {
    class HasMetadataMixin extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);
            hasMetadataMixin(this);
        }
    }

    return HasMetadataMixin as S & HasMetadataInMemoryEntityConstructor;
}
