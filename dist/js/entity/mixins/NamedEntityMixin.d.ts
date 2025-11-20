import { type NamedEntitySchemaMixin } from "../../generated/NamedEntitySchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
type NamedEntityProperties = {
    setName: (name: string) => void;
};
export declare function namedEntityMixin<T extends InMemoryEntity>(item: T): asserts item is T & NamedEntityProperties;
export type NamedInMemoryEntity = NamedEntitySchemaMixin & NamedEntityProperties;
export type NamedInMemoryEntityConstructor = Constructor<NamedInMemoryEntity>;
export {};
