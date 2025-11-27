import { InMemoryEntity } from "../in_memory";
export type HashedEntity = {
    calculateHash(): string;
    getHashObject?(): object;
};
export declare function hashedEntityMixin<T extends InMemoryEntity>(item: T): asserts item is T & HashedEntity;
