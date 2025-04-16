/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NameEntitySchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";

function props<T extends InMemoryEntity>(item: T) {
    const schema = {
        get name(): string {
            return item.prop("name", "");
        },
        set name(name: string) {
            item.setProp("name", name);
        },
    } satisfies NameEntitySchema;

    if (!("name" in item)) {
        Object.assign(item, schema);
    }

    return schema;
}

function methods<T extends InMemoryEntity>(item: T) {
    return Object.assign(item, {
        setName(name: string) {
            item.setProp("name", name);
        },
    });
}

export default function NamedEntityMixin<S extends InMemoryEntityConstructor>(superclass: S) {
    type Props = Constructor<ReturnType<typeof props<InstanceType<S>>>>;
    type Methods = Constructor<ReturnType<typeof methods<InstanceType<S>>>>;

    class NamedEntityMixin extends superclass {
        constructor(...args: any[]) {
            super(...args);
            props(this);
            methods(this);
        }
    }

    return NamedEntityMixin as S & Props & Methods;
}
