import type { Constructor } from "src/js/utils/types";
import { type HasMetadataSchemaMixin } from "../../generated/HasMetadataSchemaMixin";
import { InMemoryEntity } from "../in_memory";
type HasMetadataProperties = {
    updateMetadata: (object: object) => void;
};
export type HasMetadata = HasMetadataSchemaMixin & HasMetadataProperties;
export type HasMetadataInMemoryEntityConstructor = Constructor<HasMetadata>;
export declare function hasMetadataMixin<T extends InMemoryEntity>(item: T): asserts item is T & HasMetadata;
export {};
