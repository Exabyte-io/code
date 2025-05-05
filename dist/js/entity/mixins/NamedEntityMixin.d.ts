import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";
export declare function namedEntityMixin(item: InMemoryEntity): {
    setName(name: string): void;
    name: string;
};
export type NamedInMemoryEntity = ReturnType<typeof namedEntityMixin>;
export type NamedInMemoryEntityConstructor = Constructor<NamedInMemoryEntity>;
export default function NamedEntityMixin<S extends InMemoryEntityConstructor>(superclass: S): S & NamedInMemoryEntityConstructor;
