import type { Constructor } from "../../../utils/types";
import { type InMemoryEntity } from "../../in_memory";
import type { InMemoryEntityInSet, InMemoryEntityInSetConstructor } from "../InMemoryEntityInSetMixin";
export declare function orderedEntityInSetMixin(item: InMemoryEntity & InMemoryEntityInSet): {
    getIndexByIdInOrderedSet(setId: string): number;
};
export type OrderedInMemoryEntityInSet = ReturnType<typeof orderedEntityInSetMixin>;
export type OrderedInMemoryEntityInSetConstructor = Constructor<OrderedInMemoryEntityInSet>;
type Base = Constructor<InMemoryEntity> & InMemoryEntityInSetConstructor;
export default function OrderedInMemoryEntityInSetMixin<S extends Base = Base>(superclass: S): S & OrderedInMemoryEntityInSetConstructor;
export {};
