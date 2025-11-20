import type { DescriptionSchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type HasDescriptionSchemaMixin = DescriptionSchema;
export type HasDescriptionInMemoryEntity = InMemoryEntity & HasDescriptionSchemaMixin;
export declare function hasDescriptionSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & HasDescriptionSchemaMixin;
