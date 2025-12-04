import type { RuntimeItemsSchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";

export type RuntimeItemsSchemaMixin = RuntimeItemsSchema;

export type RuntimeItemsInMemoryEntity = InMemoryEntity & RuntimeItemsSchemaMixin;

export function runtimeItemsSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & RuntimeItemsSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity & RuntimeItemsSchemaMixin = {
        get preProcessors() {
            return this.requiredProp<RuntimeItemsSchema["preProcessors"]>("preProcessors");
        },
        set preProcessors(value: RuntimeItemsSchema["preProcessors"]) {
            this.setProp("preProcessors", value);
        },
        get postProcessors() {
            return this.requiredProp<RuntimeItemsSchema["postProcessors"]>("postProcessors");
        },
        set postProcessors(value: RuntimeItemsSchema["postProcessors"]) {
            this.setProp("postProcessors", value);
        },
        get monitors() {
            return this.requiredProp<RuntimeItemsSchema["monitors"]>("monitors");
        },
        set monitors(value: RuntimeItemsSchema["monitors"]) {
            this.setProp("monitors", value);
        },
        get results() {
            return this.requiredProp<RuntimeItemsSchema["results"]>("results");
        },
        set results(value: RuntimeItemsSchema["results"]) {
            this.setProp("results", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
