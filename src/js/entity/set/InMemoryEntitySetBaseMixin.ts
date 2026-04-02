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
    // @ts-expect-error
    const properties: InMemoryEntity & EntitySetSchema = {
        get isEntitySet() {
            return this.prop("isEntitySet", false);
        },

        get entitySetType() {
            return this.prop("entitySetType", EntitySetType.unordered);
        },

        get entityCls() {
            return this.prop<string | undefined>("entityCls");
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

type EntitySetBaseMethodsDescriptor = {
    toJSONForInclusionInEntity(): { _id: string; type: string };
};

function methodsMixin<E extends InMemoryEntity>(item: E & EntitySetSchema) {
    const originalCls = item.cls;

    // @ts-expect-error
    const properties: InMemoryEntity & EntitySetSchema & EntitySetBaseMethodsDescriptor = {
        get cls() {
            return this.entityCls || originalCls;
        },
        toJSONForInclusionInEntity() {
            const { _id, type } = this.toJSON() as { _id: string; type: string };
            return { _id, type };
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
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
