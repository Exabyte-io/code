/* eslint-disable @typescript-eslint/no-explicit-any */
import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { type InMemoryEntity } from "../in_memory";

export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];

function entityInSetPropsMixin<E extends InMemoryEntity>(item: E) {
    const properties = {
        get inSet() {
            return item.prop<InSet[]>("inSet", []);
        },

        set inSet(inSet: InSet[]) {
            item.setProp("inSet", inSet);
        },
    } satisfies SystemInSetSchema;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

function entityInSetMethodsMixin<E extends InMemoryEntity>(item: E & InMemoryEntityInSetProps) {
    const methods = {
        getInSetFilteredByCls(cls: string) {
            return item.inSet.filter((ref) => ref.cls === cls);
        },

        // finds a parent entity set of the same cls (hence `cls` field is absent)
        // NOTE: assumes that only one entry of this kind is present => gets the first one
        get parentEntitySetReference() {
            return item.inSet.find((item) => item._id && !item.cls);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(methods));

    return methods;
}

export function entityInSetMixin<E extends InMemoryEntity>(item: E) {
    entityInSetPropsMixin(item);
    entityInSetMethodsMixin(item as E & InMemoryEntityInSetProps);
}

type InMemoryEntityInSetProps = ReturnType<typeof entityInSetPropsMixin>;
type InMemoryEntityInSetPropsConstructor = Constructor<InMemoryEntityInSetProps>;
type InMemoryEntityInSetMethods = ReturnType<typeof entityInSetMethodsMixin>;
type InMemoryEntityInSetMethodsConstructor = Constructor<InMemoryEntityInSetMethods>;

export type InMemoryEntityInSet = InMemoryEntityInSetProps & InMemoryEntityInSetMethods;
export type InMemoryEntityInSetConstructor = InMemoryEntityInSetPropsConstructor &
    InMemoryEntityInSetMethodsConstructor;

type Base = Constructor<InMemoryEntity>;

export default function InMemoryEntityInSetMixin<S extends Base = Base>(superclass: S) {
    class InMemoryEntityInSetMixin extends superclass {
        constructor(...args: any[]) {
            super(...args);
            entityInSetMixin(this);
        }
    }

    return InMemoryEntityInSetMixin as S & InMemoryEntityInSetConstructor;
}
