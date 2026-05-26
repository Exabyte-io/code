import { type InMemoryEntity } from "../../in_memory";
import { ENTITY_SET_TYPES } from "../enums";
import type { InMemoryEntitySetBase } from "../InMemoryEntitySetBaseMixin";

export type OrderedInMemoryEntitySet = {
    get isOrderedSet(): boolean;
};

export function orderedEntitySetMixin<T extends InMemoryEntity & InMemoryEntitySetBase>(
    item: T,
): asserts item is T & OrderedInMemoryEntitySet {
    // @ts-expect-error
    const properties: InMemoryEntity & InMemoryEntitySetBase & OrderedInMemoryEntitySet = {
        get isOrderedSet(): boolean {
            return this.entitySetType === ENTITY_SET_TYPES.ordered;
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
