"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeItemsUIAllowedMixin =
    exports.RuntimeItemsUILogicMixin =
    exports.RuntimeItemsMixin =
    exports.ItemKey =
        void 0;
const object_1 = require("../../utils/object");
var ItemKey;
(function (ItemKey) {
    ItemKey["results"] = "results";
    ItemKey["monitors"] = "monitors";
    ItemKey["preProcessors"] = "preProcessors";
    ItemKey["postProcessors"] = "postProcessors";
})((ItemKey = exports.ItemKey || (exports.ItemKey = {})));
/*
 * @summary Contains runtime items: results, monitors, pre/postProcessors
 *          Is meant to work with Entity, InMemoryEntity b/c of `prop` extraction from `_json`.
 */
function RuntimeItemsMixin(superclass) {
    return class extends superclass {
        get results() {
            return this.prop("results", this.defaultResults).map(object_1.safeMakeObject);
        }
        get monitors() {
            return this.prop("monitors", this.defaultMonitors).map(object_1.safeMakeObject);
        }
        get preProcessors() {
            // TODO: safeMakeObject could return null. Should we throw an error here?
            return this.prop("preProcessors", this.defaultPreProcessors).map(
                object_1.safeMakeObject,
            );
        }
        get postProcessors() {
            // TODO: safeMakeObject could return null. Should we throw an error here?
            return this.prop("postProcessors", this.defaultPostProcessors).map(
                object_1.safeMakeObject,
            );
        }
        get defaultResults() {
            return [];
        }
        get defaultMonitors() {
            return [];
        }
        get defaultPreProcessors() {
            return [];
        }
        get defaultPostProcessors() {
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
exports.RuntimeItemsMixin = RuntimeItemsMixin;
const allKeys = [ItemKey.results, ItemKey.monitors, ItemKey.postProcessors, ItemKey.preProcessors];
function RuntimeItemsUILogicMixin(superclass) {
    return class extends RuntimeItemsMixin(superclass) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...params) {
            super(...params);
            const config = params[0];
            this._initRuntimeItems(allKeys, config);
        }
        getDefaultsByKey(key) {
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
         * @param keys
         * @param config
         * @private
         */
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        _initRuntimeItems(keys, config) {
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
        _addRuntimeItem(key = ItemKey.results, config) {
            const runtimeItems = this._json[key];
            if (!runtimeItems) {
                throw new Error("not found");
            }
            runtimeItems.push((0, object_1.safeMakeObject)(config));
        }
        // eslint-disable-next-line default-param-last
        _removeRuntimeItem(key = ItemKey.results, config) {
            const newConfig = (0, object_1.safeMakeObject)(config);
            this._removeRuntimeItemByName(
                key,
                (newConfig === null || newConfig === void 0 ? void 0 : newConfig.name) || "",
            );
        }
        _removeRuntimeItemByName(key, name) {
            this._json[key] = this._json[key].filter((x) => x.name !== name);
        }
        _toggleRuntimeItem(
            // eslint-disable-next-line default-param-last
            key = ItemKey.results,
            data,
            isAdding,
        ) {
            if (isAdding) {
                this._addRuntimeItem(key, data);
            } else {
                this._removeRuntimeItem(key, data);
            }
        }
        toggleResult(data, isAdding) {
            this._toggleRuntimeItem(ItemKey.results, data, isAdding);
        }
        toggleMonitor(data, isAdding) {
            this._toggleRuntimeItem(ItemKey.monitors, data, isAdding);
        }
        togglePreProcessor(data, isAdding) {
            this._toggleRuntimeItem(ItemKey.preProcessors, data, isAdding);
        }
        togglePostProcessor(data, isAdding) {
            this._toggleRuntimeItem(ItemKey.postProcessors, data, isAdding);
        }
        get resultNames() {
            return this.results.map((r) => {
                return r && r.name;
            });
        }
        get monitorNames() {
            return this.monitors.map((r) => (r === null || r === void 0 ? void 0 : r.name));
        }
        get postProcessorNames() {
            return this.postProcessors.map((r) => (r === null || r === void 0 ? void 0 : r.name));
        }
        get preProcessorNames() {
            return this.preProcessors.map((r) => (r === null || r === void 0 ? void 0 : r.name));
        }
        getResultByName(name) {
            return this.results.find(
                (r) => (r === null || r === void 0 ? void 0 : r.name) === name,
            );
        }
    };
}
exports.RuntimeItemsUILogicMixin = RuntimeItemsUILogicMixin;
// "Placeholder" mixin. Used to indicate the presence of the fields in parent class.
function RuntimeItemsUIAllowedMixin(superclass) {
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
exports.RuntimeItemsUIAllowedMixin = RuntimeItemsUIAllowedMixin;
