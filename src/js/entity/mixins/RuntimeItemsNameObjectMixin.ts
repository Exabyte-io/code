import {
    type RuntimeItemsNameObjectSchemaMixin,
    runtimeItemsNameObjectSchemaMixin,
} from "../../generated/RuntimeItemsNameObjectSchemaMixin";
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

export function runtimeItemsNameObjectMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & RuntimeItemsNameObject {
    runtimeItemsNameObjectSchemaMixin(item);

    // @ts-expect-error
    const properties: InMemoryEntity & RuntimeItemsNameObject = {
        get hashObjectFromRuntimeItems() {
            return {
                results: this.results,
                preProcessors: this.preProcessors,
                postProcessors: this.postProcessors,
            };
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export type RuntimeItemsNameObjectInMemoryEntity = RuntimeItemsNameObjectSchemaMixin &
    RuntimeItemsNameObjectProperties;

export type RuntimeItemsNameObjectInMemoryEntityConstructor =
    Constructor<RuntimeItemsNameObjectInMemoryEntity>;
