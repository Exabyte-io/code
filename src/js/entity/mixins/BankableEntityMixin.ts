import { type BankableSchemaMixin, bankableSchemaMixin } from "../../generated/BankableSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
import { type HashedEntity, hashedEntityMixin } from "./HashedEntityMixin";

export type BankableEntity = BankableSchemaMixin & HashedEntity;

export type BankableInMemoryEntityConstructor = Constructor<BankableEntity>;

export function bankableEntityMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & BankableEntity {
    bankableSchemaMixin(item);
    hashedEntityMixin(item);
}
