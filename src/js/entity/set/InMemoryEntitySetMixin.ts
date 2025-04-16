/* eslint-disable @typescript-eslint/no-explicit-any */
import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { type InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";

export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];

function methods<T extends InMemoryEntity>(item: T) {
    return Object.assign(item, {
        containsEntity<T extends SystemInSetSchema>(entity?: T) {
            return Boolean(entity?.inSet?.some((ref) => ref._id === item.id));
        },
    });
}

export default function InMemoryEntitySetMixin<
    S extends InMemoryEntityConstructor = InMemoryEntityConstructor,
>(superclass: S) {
    type Methods = Constructor<ReturnType<typeof methods<InstanceType<S>>>>;

    class InMemoryEntitySetMixin extends superclass {
        constructor(...args: any[]) {
            super(...args);
            methods(this);
        }
    }

    return InMemoryEntitySetMixin as S & Methods;
}
