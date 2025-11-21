import { type HasDescriptionSchemaMixin } from "../../generated/HasDescriptionSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
export type HasDescription = HasDescriptionSchemaMixin;
export type HasDescriptionInMemoryEntity = HasDescriptionSchemaMixin;
export type HasDescriptionInMemoryEntityConstructor = Constructor<HasDescriptionInMemoryEntity>;
export declare function hasDescriptionMixin<T extends InMemoryEntity>(item: T): asserts item is T & HasDescriptionSchemaMixin;
