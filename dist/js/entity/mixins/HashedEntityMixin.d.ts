import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
export type HashedEntity = {
    calculateHash(): string;
    getHashObject?(): object;
};
export type HashedEntityInMemoryEntity = HashedEntity;
export type HashedEntityInMemoryEntityConstructor = Constructor<HashedEntityInMemoryEntity>;
export declare function hashedEntityMixin<T extends InMemoryEntity>(item: T): asserts item is T & HashedEntity;
