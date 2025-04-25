import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";
declare function namedEntityMixin(item: InMemoryEntity): {
    name: string;
};
declare function namedEntityMethodsMixin(item: InMemoryEntity): InMemoryEntity & {
    setName(name: string): void;
};
type NamedEntityProps = ReturnType<typeof namedEntityMixin>;
type NamedEntityMethods = ReturnType<typeof namedEntityMethodsMixin>;
export type NamedEntity = NamedEntityProps & NamedEntityMethods;
export type NamedEntityConstructor = Constructor<NamedEntity>;
export default function NamedEntityMixin<S extends InMemoryEntityConstructor>(superclass: S): S & NamedEntityConstructor;
export {};
