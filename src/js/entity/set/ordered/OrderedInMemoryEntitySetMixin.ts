/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Constructor } from "../../../utils/types";
import { type InMemoryEntity } from "../../in_memory";
import { ENTITY_SET_TYPES } from "../enums";
import type {
    InMemoryEntitySetBase,
    InMemoryEntitySetBaseConstructor,
} from "../InMemoryEntitySetBaseMixin";

export function orderedEntitySetMixin(item: InMemoryEntity & InMemoryEntitySetBase) {
    const properties = {
        get isOrderedSet(): boolean {
            return item.entitySetType === ENTITY_SET_TYPES.ordered;
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export type OrderedInMemoryEntitySet = ReturnType<typeof orderedEntitySetMixin>;
export type OrderedInMemoryEntitySetConstructor = Constructor<OrderedInMemoryEntitySet>;

type Base = Constructor<InMemoryEntity> & InMemoryEntitySetBaseConstructor;

export default function OrderedInMemoryEntitySetMixin<S extends Base = Base>(superclass: S) {
    class OrderedInMemoryEntitySetMixin extends superclass {
        constructor(...args: any[]) {
            super(...args);
            orderedEntitySetMixin(this);
        }
    }

    return OrderedInMemoryEntitySetMixin as S & OrderedInMemoryEntitySetConstructor;
}
