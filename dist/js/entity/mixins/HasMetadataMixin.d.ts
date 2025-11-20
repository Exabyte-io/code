import { type HasMetadataSchemaMixin } from "../../generated/HasMetadataSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
type HasMetadataProperties = {
    updateMetadata: (object: object) => void;
};
export declare function hasMetadataMixin<T extends InMemoryEntity>(item: T): asserts item is T & HasMetadataProperties;
export type HasMetadataInMemoryEntity = HasMetadataSchemaMixin & HasMetadataProperties;
export type HasMetadataInMemoryEntityConstructor = Constructor<HasMetadataInMemoryEntity>;
export {};
