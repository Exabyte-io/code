import type { MetadataSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
type Metadata = MetadataSchema["metadata"];
export type HasMetadata<T extends Metadata = Metadata> = {
    metadata?: T;
    updateMetadata: (object: Partial<T>) => void;
};
export type HasMetadataInMemoryEntityConstructor<T extends Metadata = Metadata> = Constructor<HasMetadata<T>>;
export declare function hasMetadataMixin<T extends InMemoryEntity>(item: T): asserts item is T & HasMetadata;
export {};
