import type { RuntimeItemsStringSchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";

export type RuntimeItemsStringSchemaMixin = RuntimeItemsStringSchema;

export type RuntimeItemsStringInMemoryEntity = InMemoryEntity & RuntimeItemsStringSchemaMixin;

export function runtimeItemsStringSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & RuntimeItemsStringSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity & RuntimeItemsStringSchemaMixin = {
        get preProcessors() {
            return this.requiredProp<RuntimeItemsStringSchema["preProcessors"]>("preProcessors");
        },
        set preProcessors(value: RuntimeItemsStringSchema["preProcessors"]) {
            this.setProp("preProcessors", value);
        },
        get postProcessors() {
            return this.requiredProp<RuntimeItemsStringSchema["postProcessors"]>("postProcessors");
        },
        set postProcessors(value: RuntimeItemsStringSchema["postProcessors"]) {
            this.setProp("postProcessors", value);
        },
        get monitors() {
            return this.requiredProp<RuntimeItemsStringSchema["monitors"]>("monitors");
        },
        set monitors(value: RuntimeItemsStringSchema["monitors"]) {
            this.setProp("monitors", value);
        },
        get results() {
            return this.requiredProp<RuntimeItemsStringSchema["results"]>("results");
        },
        set results(value: RuntimeItemsStringSchema["results"]) {
            this.setProp("results", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
