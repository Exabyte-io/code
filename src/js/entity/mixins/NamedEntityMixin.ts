/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NameEntitySchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";

function namedEntityMixin(item: InMemoryEntity) {
    const schema = {
        get name(): string {
            return item.prop("name", "");
        },
        set name(name: string) {
            item.setProp("name", name);
        },
    } satisfies NameEntitySchema;

    Object.assign(item, schema);

    return schema;
}

function namedEntityMethodsMixin(item: InMemoryEntity) {
    return Object.assign(item, {
        setName(name: string) {
            item.setProp("name", name);
        },
    });
}

type NamedEntityProps = ReturnType<typeof namedEntityMixin>;
type NamedEntityMethods = ReturnType<typeof namedEntityMethodsMixin>;

export type NamedEntity = NamedEntityProps & NamedEntityMethods;
export type NamedEntityConstructor = Constructor<NamedEntity>;

export default function NamedEntityMixin<S extends InMemoryEntityConstructor>(superclass: S) {
    class NamedEntityMixin extends superclass {
        constructor(...args: any[]) {
            super(...args);
            namedEntityMixin(this);
            namedEntityMethodsMixin(this);
        }
    }

    return NamedEntityMixin as S & NamedEntityConstructor;
}
