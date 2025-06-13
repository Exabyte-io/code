import type { NameResultSchema } from "@mat3ra/esse/dist/js/types";

import { safeMakeObject } from "../../utils/object";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

export enum ItemKey {
    results = "results",
    monitors = "monitors",
    preProcessors = "preProcessors",
    postProcessors = "postProcessors",
}

export type BaseRuntimeItemsInMemoryEntity = InMemoryEntity & {
    _json: {
        results?: NameResultSchema[];
        monitors?: NameResultSchema[];
        preProcessors?: NameResultSchema[];
        postProcessors?: NameResultSchema[];
    };
    defaultResults?: NameResultSchema[];
    defaultMonitors?: NameResultSchema[];
    defaultPreProcessors?: NameResultSchema[];
    defaultPostProcessors?: NameResultSchema[];
};

/*
 * @summary Contains runtime items: results, monitors, pre/postProcessors
 *          Is meant to work with Entity, InMemoryEntity b/c of `prop` extraction from `_json`.
 */
export function runtimeItemsMixin(item: BaseRuntimeItemsInMemoryEntity) {
    // @ts-expect-error - this is a hack to get the properties of the item
    const properties: BaseRuntimeItemsInMemoryEntity & RuntimeItemsInMemoryEntity = {
        get results(): NameResultSchema[] {
            return this.prop("results", this.defaultResults ?? []).map(safeMakeObject);
        },

        get monitors(): NameResultSchema[] {
            return this.prop("monitors", this.defaultMonitors ?? []).map(safeMakeObject);
        },

        get preProcessors(): NameResultSchema[] {
            // TODO: safeMakeObject could return null. Should we throw an error here?
            return this.prop("preProcessors", this.defaultPreProcessors ?? []).map(safeMakeObject);
        },

        get postProcessors(): NameResultSchema[] {
            // TODO: safeMakeObject could return null. Should we throw an error here?
            return this.prop("postProcessors", this.defaultPostProcessors ?? []).map(
                safeMakeObject,
            );
        },

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

export type RuntimeItemsInMemoryEntity = {
    results: NameResultSchema[];
    monitors: NameResultSchema[];
    preProcessors: NameResultSchema[];
    postProcessors: NameResultSchema[];
    hashObjectFromRuntimeItems: {
        results: NameResultSchema[];
        preProcessors: NameResultSchema[];
        postProcessors: NameResultSchema[];
    };
};

export type RuntimeItemsInMemoryEntityConstructor = Constructor<RuntimeItemsInMemoryEntity>;

export default function RuntimeItemsMixin<S extends Constructor<BaseRuntimeItemsInMemoryEntity>>(
    superclass: S,
) {
    class RuntimeItemsMixin extends superclass {}

    runtimeItemsMixin(RuntimeItemsMixin.prototype);

    return RuntimeItemsMixin as S & RuntimeItemsInMemoryEntityConstructor;
}
