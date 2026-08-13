import { type BaseInMemoryEntitySchema, type EntitySetSchema } from "@mat3ra/esse/dist/js/types";

import { type InMemoryEntity } from "../../in_memory";
import { ENTITY_SET_TYPES } from "../enums";
import type { InMemoryEntitySetBase } from "../InMemoryEntitySetBaseMixin";

type EntitySetEntitySchema = BaseInMemoryEntitySchema & EntitySetSchema;

export type OrderedInMemoryEntitySet = {
    get isOrderedSet(): boolean;
};

export function orderedEntitySetMixin<T extends InMemoryEntity & InMemoryEntitySetBase>(
    item: T,
): asserts item is T & OrderedInMemoryEntitySet {
    // @ts-expect-error
    const properties: InMemoryEntity<EntitySetEntitySchema> &
        InMemoryEntitySetBase &
        OrderedInMemoryEntitySet = {
        get isOrderedSet(): boolean {
            return this.entitySetType === ENTITY_SET_TYPES.ordered;
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
