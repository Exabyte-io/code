/* eslint-disable @typescript-eslint/no-explicit-any */
import { type EntitySetSchema, SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { type InMemoryEntity } from "../in_memory";

export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];

export function inMemoryEntitySetBaseMixin<T extends InMemoryEntity>(item: T) {
    const originalCls = item.cls;

    const properties = {
        get isEntitySet() {
            return item.prop<EntitySetSchema["isEntitySet"]>("isEntitySet", false);
        },

        get entitySetType() {
            return item.prop<EntitySetSchema["entitySetType"]>("entitySetType");
        },

        get entityCls() {
            return item.prop<EntitySetSchema["entityCls"]>("entityCls");
        },

        get cls() {
            return this.entityCls || originalCls;
        },

        toJSONForInclusionInEntity() {
            const { _id, type } = item.toJSON() as { _id: string; type: string };
            return { _id, type };
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export type InMemoryEntitySetBase = ReturnType<typeof inMemoryEntitySetBaseMixin>;
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
