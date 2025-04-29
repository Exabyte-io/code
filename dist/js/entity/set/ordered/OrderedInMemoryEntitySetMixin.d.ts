import type { Constructor } from "../../../utils/types";
import { type InMemoryEntity } from "../../in_memory";
import type { InMemoryEntitySetBase, InMemoryEntitySetBaseConstructor } from "../InMemoryEntitySetBaseMixin";
export declare function orderedEntitySetMixin(item: InMemoryEntity & InMemoryEntitySetBase): {
    readonly isOrderedSet: boolean;
};
export type OrderedInMemoryEntitySet = ReturnType<typeof orderedEntitySetMixin>;
export type OrderedInMemoryEntitySetConstructor = Constructor<OrderedInMemoryEntitySet>;
type Base = Constructor<InMemoryEntity> & InMemoryEntitySetBaseConstructor;
export default function OrderedInMemoryEntitySetMixin<S extends Base = Base>(superclass: S): S & OrderedInMemoryEntitySetConstructor;
export {};
