/* eslint-disable @typescript-eslint/no-explicit-any */
import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { type InMemoryEntity } from "../in_memory";

export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];

export function inMemoryEntitySetMixin<T extends InMemoryEntity>(item: T) {
    return Object.assign(item, {
        containsEntity<T extends SystemInSetSchema>(entity?: T) {
            return Boolean(entity?.inSet?.some((ref) => ref._id === item.id));
        },
    });
}

export type InMemoryEntitySet = ReturnType<typeof inMemoryEntitySetMixin>;
export type InMemoryEntitySetConstructor = Constructor<InMemoryEntitySet>;

type Base = Constructor<InMemoryEntity>;

export default function InMemoryEntitySetMixin<S extends Base = Base>(superclass: S) {
    class InMemoryEntitySetMixin extends superclass {
        constructor(...args: any[]) {
            super(...args);
            inMemoryEntitySetMixin(this);
        }
    }

    return InMemoryEntitySetMixin as S & InMemoryEntitySetConstructor;
}
