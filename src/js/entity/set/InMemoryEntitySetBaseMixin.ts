/* eslint-disable @typescript-eslint/no-explicit-any */
import { type EntitySetSchema, SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { type InMemoryEntity } from "../in_memory";

export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];

export enum EntitySetType {
    ordered = "ordered",
    unordered = "unordered",
}

function schemaMixin<E extends InMemoryEntity>(item: E) {
    const schema = {
        get isEntitySet() {
            return item.prop("isEntitySet", false);
        },

        get entitySetType() {
            return item.prop("entitySetType", EntitySetType.unordered);
        },

        get entityCls() {
            return item.prop<string | undefined>("entityCls");
        },
    } satisfies EntitySetSchema;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));

    return schema;
}

function methodsMixin<E extends InMemoryEntity>(item: E & EntitySetSchema) {
    const originalCls = item.cls;

    const methods = {
        get cls() {
            return item.entityCls || originalCls;
        },
        toJSONForInclusionInEntity() {
            const { _id, type } = item.toJSON() as { _id: string; type: string };
            return { _id, type };
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(methods));

    return methods;
}

export function inMemoryEntitySetBaseMixin<T extends InMemoryEntity>(item: T) {
    schemaMixin(item);
    methodsMixin(item as T & EntitySetSchema);
}

export type InMemoryEntitySetBase = ReturnType<typeof schemaMixin> &
    ReturnType<typeof methodsMixin>;
export type InMemoryEntitySetBaseConstructor = Constructor<InMemoryEntitySetBase>;

type Base = Constructor<InMemoryEntity>;

export default function InMemoryEntitySetBaseMixin<S extends Base = Base>(superclass: S) {
    class InMemoryEntitySetBaseMixin extends superclass {
        constructor(...args: any[]) {
            super(...args);
            inMemoryEntitySetBaseMixin(this);
        }
    }

    return InMemoryEntitySetBaseMixin as S & InMemoryEntitySetBaseConstructor;
}
