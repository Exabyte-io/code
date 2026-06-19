import { type BankableSchemaMixin } from "../../generated/BankableSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
import { type HashedEntity } from "./HashedEntityMixin";
export type BankableEntity = BankableSchemaMixin & HashedEntity;
export type BankableInMemoryEntityConstructor = Constructor<BankableEntity>;
export declare function bankableEntityMixin<T extends InMemoryEntity>(item: T): asserts item is T & BankableEntity;
