/* eslint-disable class-methods-use-this */
import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { NameResultSchema, RuntimeItemSchema } from "@mat3ra/esse/dist/js/types";

import { safeMakeObject } from "../../utils/object";
import { InMemoryEntityConstructor } from "../in_memory";

export enum ItemKey {
    results = "results",
    monitors = "monitors",
    preProcessors = "preProcessors",
    postProcessors = "postProcessors",
}
/*
 * @summary Contains runtime items: results, monitors, pre/postProcessors
 *          Is meant to work with Entity, InMemoryEntity b/c of `prop` extraction from `_json`.
 */

export function RuntimeItemsMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        get results(): NameResultSchema[] {
            return this.prop("results", this.defaultResults).map(safeMakeObject);
        }

        get monitors(): NameResultSchema[] {
            return this.prop("monitors", this.defaultMonitors).map(safeMakeObject);
        }

        get preProcessors(): NameResultSchema[] {
            // TODO: safeMakeObject could return null. Should we throw an error here?
            return this.prop("preProcessors", this.defaultPreProcessors).map(safeMakeObject);
        }

        get postProcessors(): NameResultSchema[] {
            // TODO: safeMakeObject could return null. Should we throw an error here?
            return this.prop("postProcessors", this.defaultPostProcessors).map(safeMakeObject);
        }

        get defaultResults(): NameResultSchema[] {
            return [];
        }

        get defaultMonitors(): NameResultSchema[] {
            return [];
        }

        get defaultPreProcessors(): NameResultSchema[] {
            return [];
        }

        get defaultPostProcessors(): NameResultSchema[] {
            return [];
        }

        get hashObjectFromRuntimeItems() {
            return {
                results: this.results,
                preProcessors: this.preProcessors,
                postProcessors: this.postProcessors,
            };
        }
    };
}

export interface RuntimeItemsUILogicJSON extends AnyObject {
    results?: NameResultSchema[];
    monitors?: NameResultSchema[];
    preProcessors?: NameResultSchema[];
    postProcessors?: NameResultSchema[];
}

const allKeys: ItemKey[] = [
    ItemKey.results,
    ItemKey.monitors,
    ItemKey.postProcessors,
    ItemKey.preProcessors,
];

export function RuntimeItemsUILogicMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends RuntimeItemsMixin(superclass) {
        declare _json: RuntimeItemsUILogicJSON;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...params: any) {
            super(...params);

            const config = params[0];

            this._initRuntimeItems(allKeys, config);
        }

        getDefaultsByKey(key: ItemKey) {
            if (key === ItemKey.results) {
                return this.defaultResults;
            }
            if (key === ItemKey.monitors) {
                return this.defaultMonitors;
            }
            if (key === ItemKey.preProcessors) {
                return this.defaultPreProcessors;
            }
            return this.defaultPostProcessors;
        }

        setRuntimeItemsToDefaultValues() {
            allKeys.forEach((name) => this.setProp(name, this.getDefaultsByKey(name)));
        }

        /**
         * @summary Must pass config for subclasses to override and use initialization logic
         * @private
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _initRuntimeItems(keys: ItemKey[], _config: object) {
            // keeping this separate from constructor so that it can be overridden in mixing (eg. in `ExecutionUnit`)
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            keys.forEach((key) => {
                if (!me._json[key]) {
                    me._json[key] = me.getDefaultsByKey(key);
                }
            });
        }

        // eslint-disable-next-line default-param-last
        _addRuntimeItem(key: ItemKey = ItemKey.results, config: RuntimeItemSchema) {
            const runtimeItems = this._json[key];
            if (!runtimeItems) {
                throw new Error("not found");
            }
            runtimeItems.push(safeMakeObject(config));
        }

        // eslint-disable-next-line default-param-last
        _removeRuntimeItem(key: ItemKey = ItemKey.results, config: RuntimeItemSchema) {
            const newConfig = safeMakeObject(config);
            this._removeRuntimeItemByName(key, newConfig?.name || "");
        }

        _removeRuntimeItemByName(key: ItemKey, name: string) {
            this._json[key] = (this._json[key] as NameResultSchema[]).filter(
                (x) => x.name !== name,
            );
        }

        _toggleRuntimeItem(
            // eslint-disable-next-line default-param-last
            key: ItemKey = ItemKey.results,
            data: RuntimeItemSchema,
            isAdding: boolean,
        ) {
            if (isAdding) {
                this._addRuntimeItem(key, data);
            } else {
                this._removeRuntimeItem(key, data);
            }
        }

        toggleResult(data: RuntimeItemSchema, isAdding: boolean) {
            this._toggleRuntimeItem(ItemKey.results, data, isAdding);
        }

        toggleMonitor(data: RuntimeItemSchema, isAdding: boolean) {
            this._toggleRuntimeItem(ItemKey.monitors, data, isAdding);
        }

        togglePreProcessor(data: RuntimeItemSchema, isAdding: boolean) {
            this._toggleRuntimeItem(ItemKey.preProcessors, data, isAdding);
        }

        togglePostProcessor(data: RuntimeItemSchema, isAdding: boolean) {
            this._toggleRuntimeItem(ItemKey.postProcessors, data, isAdding);
        }

        get resultNames() {
            return this.results.map((r) => {
                return r && r.name;
            });
        }

        get monitorNames() {
            return this.monitors.map((r) => r?.name);
        }

        get postProcessorNames() {
            return this.postProcessors.map((r) => r?.name);
        }

        get preProcessorNames() {
            return this.preProcessors.map((r) => r?.name);
        }

        getResultByName(name: string) {
            return this.results.find((r) => r?.name === name);
        }
    };
}

// "Placeholder" mixin. Used to indicate the presence of the fields in parent class.
export function RuntimeItemsUIAllowedMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        get allowedResults() {
            return [];
        }

        get allowedMonitors() {
            return [];
        }

        get allowedPostProcessors() {
            return [];
        }
    };
}
