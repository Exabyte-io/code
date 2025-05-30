/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Constructor } from "../../../utils/types";
import { type InMemoryEntity } from "../../in_memory";
import type {
    InMemoryEntityInSet,
    InMemoryEntityInSetConstructor,
} from "../InMemoryEntityInSetMixin";

export function orderedEntityInSetMixin(item: InMemoryEntity & InMemoryEntityInSet) {
    const properties = {
        getIndexByIdInOrderedSet(setId: string): number {
            const setData = item.inSet.find((s) => s._id === setId);
            return setData?.index || 0;
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export type OrderedInMemoryEntityInSet = ReturnType<typeof orderedEntityInSetMixin>;
export type OrderedInMemoryEntityInSetConstructor = Constructor<OrderedInMemoryEntityInSet>;

type Base = Constructor<InMemoryEntity> & InMemoryEntityInSetConstructor;

export default function OrderedInMemoryEntityInSetMixin<S extends Base = Base>(superclass: S) {
    class OrderedInMemoryEntityInSetMixin extends superclass {
        constructor(...args: any[]) {
            super(...args);
            orderedEntityInSetMixin(this);
        }
    }

    return OrderedInMemoryEntityInSetMixin as S & OrderedInMemoryEntityInSetConstructor;
}
