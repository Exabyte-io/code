import type { Constructor } from "src/js/utils/types";
import { type RuntimeItemsSchemaMixin } from "../../generated/RuntimeItemsSchemaMixin";
import { InMemoryEntity } from "../in_memory";
type RuntimeItemsProperties = {
    hashObjectFromRuntimeItems: {
        results: RuntimeItemsSchemaMixin["results"];
        preProcessors: RuntimeItemsSchemaMixin["preProcessors"];
        postProcessors: RuntimeItemsSchemaMixin["postProcessors"];
    };
};
export type RuntimeItems = RuntimeItemsSchemaMixin & RuntimeItemsProperties;
export type RuntimeItemsInMemoryEntityConstructor = Constructor<RuntimeItems>;
export declare function runtimeItemsMixin<T extends InMemoryEntity>(item: T): asserts item is T & RuntimeItems;
export {};
