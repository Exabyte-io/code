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
    // @ts-expect-error - this is a hack to get the properties of the item
    const properties = {
        get results() {
            var _a;
            return this.prop("results", (_a = this.defaultResults) !== null && _a !== void 0 ? _a : []).map(object_1.safeMakeObject);
        },
        get monitors() {
            var _a;
            return this.prop("monitors", (_a = this.defaultMonitors) !== null && _a !== void 0 ? _a : []).map(object_1.safeMakeObject);
        },
        get preProcessors() {
            var _a;
            // TODO: safeMakeObject could return null. Should we throw an error here?
            return this.prop("preProcessors", (_a = this.defaultPreProcessors) !== null && _a !== void 0 ? _a : []).map(object_1.safeMakeObject);
        },
        get postProcessors() {
            var _a;
            // TODO: safeMakeObject could return null. Should we throw an error here?
            return this.prop("postProcessors", (_a = this.defaultPostProcessors) !== null && _a !== void 0 ? _a : []).map(object_1.safeMakeObject);
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
function RuntimeItemsMixin(superclass) {
    class RuntimeItemsMixin extends superclass {
    }
    runtimeItemsMixin(RuntimeItemsMixin.prototype);
    return RuntimeItemsMixin;
}
