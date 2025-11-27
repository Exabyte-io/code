import type { Constructor } from "src/js/utils/types";

import {
    type RuntimeItemsSchemaMixin,
    runtimeItemsSchemaMixin,
} from "../../generated/RuntimeItemsSchemaMixin";
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

function runtimeItemsPropertiesMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & RuntimeItems {
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

export function runtimeItemsMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & RuntimeItems {
    runtimeItemsSchemaMixin(item);
    runtimeItemsPropertiesMixin(item);
}
