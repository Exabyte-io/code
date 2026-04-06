import { type InMemoryEntity } from "../../in_memory";
import type { InMemoryEntityInSet } from "../InMemoryEntityInSetMixin";
export type OrderedInMemoryEntityInSet = {
    getIndexByIdInOrderedSet(setId: string): number;
};
export declare function orderedEntityInSetMixin<T extends InMemoryEntity & InMemoryEntityInSet>(item: T): asserts item is T & OrderedInMemoryEntityInSet;
