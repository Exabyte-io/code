import type { MetadataSchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
export type HasMetadataSchemaMixin = MetadataSchema;
export type HasMetadataInMemoryEntity = InMemoryEntity & HasMetadataSchemaMixin;
export declare function hasMetadataSchemaMixin<T extends InMemoryEntity>(item: InMemoryEntity): asserts item is T & HasMetadataSchemaMixin;
