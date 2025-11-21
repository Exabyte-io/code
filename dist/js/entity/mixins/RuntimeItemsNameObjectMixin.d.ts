import { type RuntimeItemsNameObjectSchemaMixin } from "../../generated/RuntimeItemsNameObjectSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
type RuntimeItemsNameObjectProperties = {
    hashObjectFromRuntimeItems: {
        results: RuntimeItemsNameObjectSchemaMixin["results"];
        preProcessors: RuntimeItemsNameObjectSchemaMixin["preProcessors"];
        postProcessors: RuntimeItemsNameObjectSchemaMixin["postProcessors"];
    };
};
type RuntimeItemsNameObject = RuntimeItemsNameObjectSchemaMixin & RuntimeItemsNameObjectProperties;
export declare function runtimeItemsNameObjectMixin<T extends InMemoryEntity>(item: T): asserts item is T & RuntimeItemsNameObject;
export type RuntimeItemsNameObjectInMemoryEntity = RuntimeItemsNameObjectSchemaMixin & RuntimeItemsNameObjectProperties;
export type RuntimeItemsNameObjectInMemoryEntityConstructor = Constructor<RuntimeItemsNameObjectInMemoryEntity>;
export {};
