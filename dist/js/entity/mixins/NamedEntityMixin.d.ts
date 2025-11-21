import { type NamedEntitySchemaMixin } from "../../generated/NamedEntitySchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
type NamedEntityProperties = {
    setName: (name: string) => void;
};
export type NamedEntity = NamedEntitySchemaMixin & NamedEntityProperties;
export type NamedInMemoryEntity = NamedEntity;
export type NamedInMemoryEntityConstructor = Constructor<NamedInMemoryEntity>;
export declare function namedEntityMixin<T extends InMemoryEntity>(item: T): asserts item is T & NamedEntityProperties;
export {};
