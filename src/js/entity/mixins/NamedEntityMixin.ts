/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NameEntitySchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";

export function namedEntityMixin(item: InMemoryEntity) {
    const properties = {
        get name(): string {
            return item.prop("name", "");
        },
        set name(name: string) {
            item.setProp("name", name);
        },
    } satisfies NameEntitySchema;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export function namedEntityMethodsMixin(item: InMemoryEntity) {
    const methods = {
        setName(name: string) {
            item.setProp("name", name);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(methods));

    return methods;
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
