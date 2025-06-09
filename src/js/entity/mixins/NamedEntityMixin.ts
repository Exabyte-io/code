import type { NameEntitySchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";

function schemaMixin(item: InMemoryEntity) {
    const schema = {
        get name(): string {
            return item.prop("name", "");
        },
        set name(name: string) {
            item.setProp("name", name);
        },
    } satisfies NameEntitySchema;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));

    return schema;
}

function propertiesMixin(item: InMemoryEntity) {
    const properties = {
        setName(name: string) {
            item.setProp("name", name);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export function namedEntityMixin(item: InMemoryEntity) {
    return {
        ...schemaMixin(item),
        ...propertiesMixin(item),
    };
}

export type NamedInMemoryEntity = ReturnType<typeof namedEntityMixin>;
export type NamedInMemoryEntityConstructor = Constructor<NamedInMemoryEntity>;

export default function NamedEntityMixin<S extends InMemoryEntityConstructor>(superclass: S) {
    class NamedEntityMixin extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);
            namedEntityMixin(this);
        }
    }

    return NamedEntityMixin as S & NamedInMemoryEntityConstructor;
}
