import { type HasDescriptionSchemaMixin } from "../../generated/HasDescriptionSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
type HashedEntityProperties = {
    calculateHash: () => string;
    getHashObject?: () => object;
};
export declare function hashedEntityMixin<T extends InMemoryEntity>(item: T): asserts item is T & HashedEntityProperties;
export type HasDescriptionInMemoryEntity = HasDescriptionSchemaMixin;
export type HasDescriptionInMemoryEntityConstructor = Constructor<HasDescriptionInMemoryEntity>;
export {};
