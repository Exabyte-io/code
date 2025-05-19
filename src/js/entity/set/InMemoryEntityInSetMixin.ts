/* eslint-disable @typescript-eslint/no-explicit-any */
import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { type InMemoryEntity } from "../in_memory";

export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];

type InMemoryEntityInSetSchema = ReturnType<typeof schemaMixin>;

function schemaMixin<E extends InMemoryEntity>(item: E) {
    const schema = {
        get inSet() {
            return item.prop<InSet[]>("inSet", []);
        },

        set inSet(inSet: InSet[]) {
            item.setProp("inSet", inSet);
        },
    } satisfies SystemInSetSchema;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));

    return schema;
}

function propertiesMixin<E extends InMemoryEntity>(item: E & InMemoryEntityInSetSchema) {
    const properties = {
        getInSetFilteredByCls(cls: string) {
            return item.inSet.filter((ref) => ref.cls === cls);
        },

        // finds a parent entity set of the same cls (hence `cls` field is absent)
        // NOTE: assumes that only one entry of this kind is present => gets the first one
        get parentEntitySetReference() {
            return item.inSet.find((item) => item._id && !item.cls);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export function inMemoryEntityInSetMixin<E extends InMemoryEntity>(item: E) {
    return {
        ...schemaMixin(item),
        ...propertiesMixin(item as E & InMemoryEntityInSetSchema),
    };
}

export type InMemoryEntityInSet = ReturnType<typeof inMemoryEntityInSetMixin>;
export type InMemoryEntityInSetConstructor = Constructor<InMemoryEntityInSet>;

type Base = Constructor<InMemoryEntity>;

export default function InMemoryEntityInSetMixin<S extends Base = Base>(superclass: S) {
    class InMemoryEntityInSetMixin extends superclass {
        constructor(...args: any[]) {
            super(...args);
            inMemoryEntityInSetMixin(this);
        }
    }

    return InMemoryEntityInSetMixin as S & InMemoryEntityInSetConstructor;
}
