import type { RuntimeItemsNameObjectSchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";

export type RuntimeItemsSchemaMixin = RuntimeItemsNameObjectSchema;

export type RuntimeItemsInMemoryEntity = InMemoryEntity & RuntimeItemsSchemaMixin;

export function runtimeItemsSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & RuntimeItemsSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity & RuntimeItemsSchemaMixin = {
        get preProcessors() {
            return this.requiredProp<RuntimeItemsNameObjectSchema["preProcessors"]>(
                "preProcessors",
            );
        },
        set preProcessors(value: RuntimeItemsNameObjectSchema["preProcessors"]) {
            this.setProp("preProcessors", value);
        },
        get postProcessors() {
            return this.requiredProp<RuntimeItemsNameObjectSchema["postProcessors"]>(
                "postProcessors",
            );
        },
        set postProcessors(value: RuntimeItemsNameObjectSchema["postProcessors"]) {
            this.setProp("postProcessors", value);
        },
        get monitors() {
            return this.requiredProp<RuntimeItemsNameObjectSchema["monitors"]>("monitors");
        },
        set monitors(value: RuntimeItemsNameObjectSchema["monitors"]) {
            this.setProp("monitors", value);
        },
        get results() {
            return this.requiredProp<RuntimeItemsNameObjectSchema["results"]>("results");
        },
        set results(value: RuntimeItemsNameObjectSchema["results"]) {
            this.setProp("results", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
