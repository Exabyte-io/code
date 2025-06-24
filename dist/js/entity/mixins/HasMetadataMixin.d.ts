import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
export declare function hasMetadataMixin<T extends InMemoryEntity>(item: T): InMemoryEntity & HasMetadataInMemoryEntity;
export type HasMetadataInMemoryEntity = {
    metadata: object;
    updateMetadata: (object: object) => void;
};
export type HasMetadataInMemoryEntityConstructor = Constructor<HasMetadataInMemoryEntity>;
