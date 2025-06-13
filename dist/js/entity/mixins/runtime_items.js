"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemKey = exports.RuntimeItemsMixin = void 0;
exports.RuntimeItemsUILogicMixin = RuntimeItemsUILogicMixin;
exports.RuntimeItemsUIAllowedMixin = RuntimeItemsUIAllowedMixin;
const object_1 = require("../../utils/object");
const RuntimeItemsMixin_1 = __importStar(require("./RuntimeItemsMixin"));
exports.RuntimeItemsMixin = RuntimeItemsMixin_1.default;
Object.defineProperty(exports, "ItemKey", { enumerable: true, get: function () { return RuntimeItemsMixin_1.ItemKey; } });
const allKeys = [
    RuntimeItemsMixin_1.ItemKey.results,
    RuntimeItemsMixin_1.ItemKey.monitors,
    RuntimeItemsMixin_1.ItemKey.postProcessors,
    RuntimeItemsMixin_1.ItemKey.preProcessors,
];
function RuntimeItemsUILogicMixin(superclass) {
    return class extends (0, RuntimeItemsMixin_1.default)(superclass) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...params) {
            super(...params);
            const config = params[0];
            this._initRuntimeItems(allKeys, config);
        }
        getDefaultsByKey(key) {
            if (key === RuntimeItemsMixin_1.ItemKey.results) {
                return this.defaultResults;
            }
            if (key === RuntimeItemsMixin_1.ItemKey.monitors) {
                return this.defaultMonitors;
            }
            if (key === RuntimeItemsMixin_1.ItemKey.preProcessors) {
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
        _initRuntimeItems(keys, _config) {
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
        _addRuntimeItem(key = RuntimeItemsMixin_1.ItemKey.results, config) {
            const runtimeItems = this._json[key];
            if (!runtimeItems) {
                throw new Error("not found");
            }
            runtimeItems.push((0, object_1.safeMakeObject)(config));
        }
        // eslint-disable-next-line default-param-last
        _removeRuntimeItem(key = RuntimeItemsMixin_1.ItemKey.results, config) {
            const newConfig = (0, object_1.safeMakeObject)(config);
            this._removeRuntimeItemByName(key, (newConfig === null || newConfig === void 0 ? void 0 : newConfig.name) || "");
        }
        _removeRuntimeItemByName(key, name) {
            this._json[key] = this._json[key].filter((x) => x.name !== name);
        }
        _toggleRuntimeItem(
        // eslint-disable-next-line default-param-last
        key = RuntimeItemsMixin_1.ItemKey.results, data, isAdding) {
            if (isAdding) {
                this._addRuntimeItem(key, data);
            }
            else {
                this._removeRuntimeItem(key, data);
            }
        }
        toggleResult(data, isAdding) {
            this._toggleRuntimeItem(RuntimeItemsMixin_1.ItemKey.results, data, isAdding);
        }
        toggleMonitor(data, isAdding) {
            this._toggleRuntimeItem(RuntimeItemsMixin_1.ItemKey.monitors, data, isAdding);
        }
        togglePreProcessor(data, isAdding) {
            this._toggleRuntimeItem(RuntimeItemsMixin_1.ItemKey.preProcessors, data, isAdding);
        }
        togglePostProcessor(data, isAdding) {
            this._toggleRuntimeItem(RuntimeItemsMixin_1.ItemKey.postProcessors, data, isAdding);
        }
        get resultNames() {
            return this.results.map((r) => {
                return r && r.name;
            });
        }
        get monitorNames() {
            return this.monitors.map((r) => r === null || r === void 0 ? void 0 : r.name);
        }
        get postProcessorNames() {
            return this.postProcessors.map((r) => r === null || r === void 0 ? void 0 : r.name);
        }
        get preProcessorNames() {
            return this.preProcessors.map((r) => r === null || r === void 0 ? void 0 : r.name);
        }
        getResultByName(name) {
            return this.results.find((r) => (r === null || r === void 0 ? void 0 : r.name) === name);
        }
    };
}
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
