import { type NamedEntitySchemaMixin } from "../../generated/NamedEntitySchemaMixin";
import { InMemoryEntity } from "../in_memory";
type NamedEntityProperties = {
    setName: (name: string) => void;
};
export type NamedEntity = NamedEntitySchemaMixin & NamedEntityProperties;
export declare function namedEntityMixin<T extends InMemoryEntity>(item: T): asserts item is T & NamedEntity;
export {};
