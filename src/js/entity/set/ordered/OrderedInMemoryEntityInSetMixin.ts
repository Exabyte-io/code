import { type InMemoryEntity } from "../../in_memory";
import type { InMemoryEntityInSet } from "../InMemoryEntityInSetMixin";

export type OrderedInMemoryEntityInSet = {
    getIndexByIdInOrderedSet(setId: string): number;
};

export function orderedEntityInSetMixin<T extends InMemoryEntity & InMemoryEntityInSet>(
    item: T,
): asserts item is T & OrderedInMemoryEntityInSet {
    // @ts-expect-error
    const properties: InMemoryEntity & InMemoryEntityInSet & OrderedInMemoryEntityInSet = {
        getIndexByIdInOrderedSet(setId: string): number {
            const setData = this.inSet.find((s) => s._id === setId);
            return setData?.index || 0;
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
