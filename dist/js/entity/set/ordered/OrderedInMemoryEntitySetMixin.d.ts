import { type InMemoryEntity } from "../../in_memory";
import type { InMemoryEntitySetBase } from "../InMemoryEntitySetBaseMixin";
export type OrderedInMemoryEntitySet = {
    get isOrderedSet(): boolean;
};
export declare function orderedEntitySetMixin<T extends InMemoryEntity & InMemoryEntitySetBase>(item: T): asserts item is T & OrderedInMemoryEntitySet;
