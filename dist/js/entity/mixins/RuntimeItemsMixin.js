"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemKey = void 0;
exports.runtimeItemsMixin = runtimeItemsMixin;
exports.default = RuntimeItemsMixin;
const object_1 = require("../../utils/object");
var ItemKey;
(function (ItemKey) {
    ItemKey["results"] = "results";
    ItemKey["monitors"] = "monitors";
    ItemKey["preProcessors"] = "preProcessors";
    ItemKey["postProcessors"] = "postProcessors";
})(ItemKey || (exports.ItemKey = ItemKey = {}));
/*
 * @summary Contains runtime items: results, monitors, pre/postProcessors
 *          Is meant to work with Entity, InMemoryEntity b/c of `prop` extraction from `_json`.
 */
function runtimeItemsMixin(item) {
    const properties = {
        get results() {
            const self = this;
            return self.prop("results", self.defaultResults || []).map(object_1.safeMakeObject);
        },
        set results(array) {
            const self = this;
            self.setProp("results", array);
        },
        get monitors() {
            const self = this;
            return self.prop("monitors", self.defaultMonitors || []).map(object_1.safeMakeObject);
        },
        set monitors(array) {
            const self = this;
            self.setProp("monitors", array);
        },
        get preProcessors() {
            const self = this;
            return self.prop("preProcessors", self.defaultPreProcessors || []).map(object_1.safeMakeObject);
        },
        set preProcessors(array) {
            const self = this;
            self.setProp("preProcessors", array);
        },
        get postProcessors() {
            const self = this;
            return self
                .prop("postProcessors", self.defaultPostProcessors || [])
                .map(object_1.safeMakeObject);
        },
        set postProcessors(array) {
            const self = this;
            self.setProp("postProcessors", array);
        },
        get resultNames() {
            return this.results.map((r) => r === null || r === void 0 ? void 0 : r.name);
        },
        get monitorNames() {
            return this.monitors.map((r) => r === null || r === void 0 ? void 0 : r.name);
        },
        get preProcessorNames() {
            return this.preProcessors.map((r) => r === null || r === void 0 ? void 0 : r.name);
        },
        get postProcessorNames() {
            return this.postProcessors.map((r) => r === null || r === void 0 ? void 0 : r.name);
        },
        _addRuntimeItem(key, config) {
            const self = this;
            const runtimeItems = self._json[key || ItemKey.results];
            if (!runtimeItems) {
                throw new Error("not found");
            }
            runtimeItems.push((0, object_1.safeMakeObject)(config));
        },
        _removeRuntimeItem(key, config) {
            const newConfig = (0, object_1.safeMakeObject)(config);
            this._removeRuntimeItemByName(key, (newConfig === null || newConfig === void 0 ? void 0 : newConfig.name) || "");
        },
        _removeRuntimeItemByName(key, name) {
            const self = this;
            self._json[key] = self._json[key].filter((x) => x.name !== name);
        },
        _toggleRuntimeItem(key, data, isAdding) {
            if (isAdding) {
                this._addRuntimeItem(key, data);
            }
            else {
                this._removeRuntimeItem(key, data);
            }
        },
        toggleResult(data, isAdding) {
            this._toggleRuntimeItem(ItemKey.results, data, isAdding);
        },
        toggleMonitor(data, isAdding) {
            this._toggleRuntimeItem(ItemKey.monitors, data, isAdding);
        },
        togglePreProcessor(data, isAdding) {
            this._toggleRuntimeItem(ItemKey.preProcessors, data, isAdding);
        },
        togglePostProcessor(data, isAdding) {
            this._toggleRuntimeItem(ItemKey.postProcessors, data, isAdding);
        },
        getResultByName(name) {
            return this.results.find((r) => (r === null || r === void 0 ? void 0 : r.name) === name);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function RuntimeItemsMixin(superclass) {
    class RuntimeItemsMixin extends superclass {
    }
    runtimeItemsMixin(RuntimeItemsMixin.prototype);
    return RuntimeItemsMixin;
}
