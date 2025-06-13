import type { NameResultSchema, RuntimeItemSchema } from "@mat3ra/esse/dist/js/types";

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
    const properties = {
        get results() {
            const self = this as unknown as BaseRuntimeItemsInMemoryEntity;
            return self.prop("results", self.defaultResults || []).map(safeMakeObject);
        },
        set results(array: NameResultSchema[]) {
            const self = this as unknown as BaseRuntimeItemsInMemoryEntity;
            self.setProp("results", array);
        },
        get monitors(): NameResultSchema[] {
            const self = this as unknown as BaseRuntimeItemsInMemoryEntity;
            return self.prop("monitors", self.defaultMonitors || []).map(safeMakeObject);
        },
        set monitors(array: NameResultSchema[]) {
            const self = this as unknown as BaseRuntimeItemsInMemoryEntity;
            self.setProp("monitors", array);
        },
        get preProcessors(): NameResultSchema[] {
            const self = this as unknown as BaseRuntimeItemsInMemoryEntity;
            return self.prop("preProcessors", self.defaultPreProcessors || []).map(safeMakeObject);
        },
        set preProcessors(array: NameResultSchema[]) {
            const self = this as unknown as BaseRuntimeItemsInMemoryEntity;
            self.setProp("preProcessors", array);
        },
        get postProcessors(): NameResultSchema[] {
            const self = this as unknown as BaseRuntimeItemsInMemoryEntity;
            return self
                .prop("postProcessors", self.defaultPostProcessors || [])
                .map(safeMakeObject);
        },
        set postProcessors(array: NameResultSchema[]) {
            const self = this as unknown as BaseRuntimeItemsInMemoryEntity;
            self.setProp("postProcessors", array);
        },

        get resultNames() {
            return this.results.map((r) => r?.name);
        },

        get monitorNames() {
            return this.monitors.map((r) => r?.name);
        },

        get preProcessorNames() {
            return this.preProcessors.map((r) => r?.name);
        },

        get postProcessorNames() {
            return this.postProcessors.map((r) => r?.name);
        },

        _addRuntimeItem(key: ItemKey, config: RuntimeItemSchema) {
            const self = this as unknown as BaseRuntimeItemsInMemoryEntity;
            const runtimeItems = self._json[key || ItemKey.results];

            if (!runtimeItems) {
                throw new Error("not found");
            }

            runtimeItems.push(safeMakeObject(config));
        },

        _removeRuntimeItem(key: ItemKey, config: RuntimeItemSchema) {
            const newConfig = safeMakeObject(config);
            this._removeRuntimeItemByName(key, newConfig?.name || "");
        },

        _removeRuntimeItemByName(key: ItemKey, name: string) {
            const self = this as unknown as BaseRuntimeItemsInMemoryEntity;
            self._json[key] = (self._json[key] as NameResultSchema[]).filter(
                (x) => x.name !== name,
            );
        },

        _toggleRuntimeItem(key: ItemKey, data: RuntimeItemSchema, isAdding: boolean) {
            if (isAdding) {
                this._addRuntimeItem(key, data);
            } else {
                this._removeRuntimeItem(key, data);
            }
        },

        toggleResult(data: RuntimeItemSchema, isAdding: boolean) {
            this._toggleRuntimeItem(ItemKey.results, data, isAdding);
        },

        toggleMonitor(data: RuntimeItemSchema, isAdding: boolean) {
            this._toggleRuntimeItem(ItemKey.monitors, data, isAdding);
        },

        togglePreProcessor(data: RuntimeItemSchema, isAdding: boolean) {
            this._toggleRuntimeItem(ItemKey.preProcessors, data, isAdding);
        },

        togglePostProcessor(data: RuntimeItemSchema, isAdding: boolean) {
            this._toggleRuntimeItem(ItemKey.postProcessors, data, isAdding);
        },

        getResultByName(name: string) {
            return this.results.find((r) => r?.name === name);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export type RuntimeItemsInMemoryEntity = ReturnType<typeof runtimeItemsMixin>;
export type RuntimeItemsInMemoryEntityConstructor = Constructor<RuntimeItemsInMemoryEntity>;

export default function RuntimeItemsMixin<S extends Constructor<BaseRuntimeItemsInMemoryEntity>>(
    superclass: S,
) {
    class RuntimeItemsMixin extends superclass {}

    runtimeItemsMixin(RuntimeItemsMixin.prototype);

    return RuntimeItemsMixin as S & RuntimeItemsInMemoryEntityConstructor;
}
