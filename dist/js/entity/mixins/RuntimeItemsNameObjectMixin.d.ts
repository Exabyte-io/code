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
export type RuntimeItemsNameObject = RuntimeItemsNameObjectSchemaMixin & RuntimeItemsNameObjectProperties;
export type RuntimeItemsNameObjectInMemoryEntity = RuntimeItemsNameObject;
export type RuntimeItemsNameObjectInMemoryEntityConstructor = Constructor<RuntimeItemsNameObject>;
export declare function runtimeItemsNameObjectMixin<T extends InMemoryEntity>(item: T): asserts item is T & RuntimeItemsNameObject;
export {};
