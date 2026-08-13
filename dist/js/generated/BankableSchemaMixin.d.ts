import type { BankableSchema, BaseInMemoryEntitySchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type BankableSchemaMixin = BankableSchema;
export type BankableInMemoryEntity = InMemoryEntity<BaseInMemoryEntitySchema & BankableSchemaMixin>;
export declare function bankableSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & BankableSchemaMixin;
