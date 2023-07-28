/* eslint-disable class-methods-use-this */
import { NameResultSchema, RuntimeItemSchema } from "../../types";
import { safeMakeObject } from "../../utils/object";
import { AnyObject, InMemoryEntityConstructor } from "../in_memory";

type ItemKey = "results" | "monitors" | "preProcessors" | "postProcessors";

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

export function RuntimeItemsUILogicMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends RuntimeItemsMixin(superclass) {
        declare _json: RuntimeItemsUILogicJSON;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...params: any) {
            super(...params);

            const config = params[0];

            this._initRuntimeItems(
                ["results", "monitors", "preProcessors", "postProcessors"],
                config,
            );
        }

        getDefaultsByKey(key: ItemKey) {
            if (key === "results") {
                return this.defaultResults;
            }
            if (key === "monitors") {
                return this.defaultMonitors;
            }
            if (key === "preProcessors") {
                return this.defaultPreProcessors;
            }
            return this.defaultPostProcessors;
        }

        setRuntimeItemsToDefaultValues() {
            const keys: ItemKey[] = ["results", "monitors", "preProcessors", "postProcessors"];
            keys.map((name) => this.setProp(name, this.getDefaultsByKey(name)));
        }

        /**
         * @summary Must pass config for subclasses to override and use initialization logic
         * @param keys
         * @param config
         * @private
         */
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        _initRuntimeItems(keys: ItemKey[], config: object) {
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
        _addRuntimeItem(key: ItemKey = "results", config: RuntimeItemSchema) {
            const runtimeItems = this._json[key];
            if (!runtimeItems) {
                throw new Error("not found");
            }
            runtimeItems.push(safeMakeObject(config));
        }

        // eslint-disable-next-line default-param-last
        _removeRuntimeItem(key: ItemKey = "results", config: RuntimeItemSchema) {
            const newConfig = safeMakeObject(config);
            this._removeRuntimeItemByName(key, newConfig?.name || "");
        }

        _removeRuntimeItemByName(key: ItemKey, name: string) {
            this._json[key] = (this._json[key] as NameResultSchema[]).filter(
                (x) => x.name !== name,
            );
        }

        // eslint-disable-next-line default-param-last
        _toggleRuntimeItem(key: ItemKey = "results", data: RuntimeItemSchema, isAdding: boolean) {
            if (isAdding) {
                this._addRuntimeItem(key, data);
            } else {
                this._removeRuntimeItem(key, data);
            }
        }

        toggleResult(data: RuntimeItemSchema, isAdding: boolean) {
            this._toggleRuntimeItem("results", data, isAdding);
        }

        toggleMonitor(data: RuntimeItemSchema, isAdding: boolean) {
            this._toggleRuntimeItem("monitors", data, isAdding);
        }

        togglePreProcessor(data: RuntimeItemSchema, isAdding: boolean) {
            this._toggleRuntimeItem("preProcessors", data, isAdding);
        }

        togglePostProcessor(data: RuntimeItemSchema, isAdding: boolean) {
            this._toggleRuntimeItem("postProcessors", data, isAdding);
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
