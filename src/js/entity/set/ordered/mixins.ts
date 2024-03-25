import { EntitySetSchema, SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import { InMemoryEntityConstructor } from "../../in_memory";
import { ENTITY_SET_TYPES } from "../enums";

// NOTE: these mixins are meant to be used together with `InMemoryEntity{In}SetMixin`s only

export function OrderedInMemoryEntitySetMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        entitySetType: EntitySetSchema["entitySetType"];

        get isOrderedSet(): boolean {
            return this.entitySetType === ENTITY_SET_TYPES.ordered;
        }
    };
}

export interface OrderedInMemoryEntityInSet {
    inSet: SystemInSetSchema["inSet"];
    getIndexByIdInOrderedSet(setId: string): number;
}

export function OrderedInMemoryEntityInSetMixin<T extends InMemoryEntityConstructor>(
    superclass: T,
) {
    return class extends superclass {
        declare inSet: Required<SystemInSetSchema>["inSet"];

        getIndexByIdInOrderedSet(setId: string): number {
            const setData = this.inSet.find((s) => s._id === setId);
            return setData?.index ? setData.index : 0;
        }
    };
}
