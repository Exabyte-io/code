import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";
export declare function hasMetadataMixin(item: InMemoryEntity): {
    updateMetadata(object: object): void;
    metadata: object;
};
export type HasMetadataInMemoryEntity = ReturnType<typeof hasMetadataMixin>;
export type HasMetadataInMemoryEntityConstructor = Constructor<HasMetadataInMemoryEntity>;
export default function HasMetadataMixin<S extends InMemoryEntityConstructor>(superclass: S): S & HasMetadataInMemoryEntityConstructor;
