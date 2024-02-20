"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobContextMixin = exports.WorkflowContextMixin = exports.MethodDataContextMixin = exports.MaterialsContextMixin = exports.MaterialsSetContextMixin = exports.MaterialContextMixin = exports.ApplicationContextMixin = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const utils_1 = require("../entity/set/ordered/utils");
function ApplicationContextMixin(superclass) {
    return class ApplicationContextMixin extends superclass {
        constructor(...args) {
            super(...args);
            // @ts-ignore
            if (!this.constructor.Application) {
                throw Error("ApplicationContextMixin: Application is undefined");
            }
            const config = args[0];
            this._application =
                (config.context && config.context.application) ||
                    // @ts-ignore
                    this.constructor.Application.createDefault();
        }
        get application() {
            return this._application;
        }
    };
}
exports.ApplicationContextMixin = ApplicationContextMixin;
function MaterialContextMixin(superclass) {
    return class MaterialContextMixin extends superclass {
        constructor(...args) {
            super(...args);
            // @ts-ignore
            if (!this.constructor.Material) {
                throw Error("MaterialContextMixin: Material is undefined");
            }
            const config = args[0];
            this._material = config.context && config.context.material;
            // @ts-ignore
            if (!this._material)
                // @ts-ignore
                this._material = this.constructor.Material.createDefault();
            this.updateMaterialHash();
        }
        // eslint-disable-next-line class-methods-use-this
        get isEditedIsSetToFalseOnMaterialUpdate() {
            return false;
        }
        updateMaterialHash() {
            if (this.isEditedIsSetToFalseOnMaterialUpdate)
                this.isEdited = false;
            this.extraData = { materialHash: this.material.hash };
        }
        // Workaround: Material.createDefault() used to initiate workflow reducer and hence here too
        //  does not have an id. Here we catch when such material is used and avoid resetting isEdited
        get isMaterialCreatedDefault() {
            return !this.material.id;
        }
        get isMaterialUpdated() {
            return Boolean(this.extraData && this.extraData.materialHash !== this.material.hash);
        }
        get material() {
            return this._material;
        }
    };
}
exports.MaterialContextMixin = MaterialContextMixin;
function MaterialsSetContextMixin(superclass) {
    return class MaterialsSetContextMixin extends superclass {
        constructor(...params) {
            super(...params);
            this._materialsSet = this.config.context && this.config.context.materialsSet;
        }
        get materialsSet() {
            return this._materialsSet;
        }
        sortMaterialsByIndexInSet(materials = []) {
            // DO NOT SORT IN PLACE AS IT CHANGES THE ORDER IN `this.materials` AND HAS SIDE EFFECTS (MaterialViewer).
            return materials.concat().sort((a, b) => {
                return (0, utils_1.compareEntitiesInOrderedSetForSorting)(a, b, this.materialsSet._id, false);
            });
        }
    };
}
exports.MaterialsSetContextMixin = MaterialsSetContextMixin;
function MaterialsContextMixin(superclass) {
    return class MaterialsContextMixin extends superclass {
        constructor(...params) {
            super(...params);
            const materials = this.config.context && this.config.context.materials;
            // @ts-ignore
            if (!this.constructor.Material) {
                throw Error("MaterialsContextMixin: Material is undefined");
            }
            this._materials =
                materials && materials.length
                    ? materials
                    : // @ts-ignore
                        [this.constructor.Material.createDefault()];
        }
        get materials() {
            return this._materials;
        }
    };
}
exports.MaterialsContextMixin = MaterialsContextMixin;
function MethodDataContextMixin(superclass) {
    return class extends superclass {
        constructor(...params) {
            super(...params);
            const config = params[0];
            this._methodData = (config.context && config.context.methodData) || {};
            this.isEdited = false; // we always get the `defaultData` (recalculated from scratch, not persistent)
        }
        /* @summary Replace the logic in constructor with this in order to enable passing `methodDataHash` between
         *          subsequent initializations of the derived class. Not used at present and kept for the record.
         */
        _initMethodDataHash() {
            this.methodDataHash = crypto_js_1.default.MD5(JSON.stringify(this.methodData)).toString();
            this.extraData = { methodDataHash: this.methodDataHash };
            if (!this._methodData) {
                this._methodData = {};
                this.isEdited = false;
                // Commented out to reduce effect on performance. Uncomment for debugging purposes.
                // TODO: remove on next refactoring or convert to log
                // console.warn("MethodDataContextMixin: methodData is undefined or null");
            }
            else if (this.isMethodDataUpdated) {
                this.isEdited = false;
            }
            else {
                // @ts-ignore
                // eslint-disable-next-line no-undef
                this.isEdited = config.isEdited;
            }
        }
        get methodData() {
            return this._methodData;
        }
        get isMethodDataUpdated() {
            return Boolean(this.extraData && this.extraData.methodDataHash !== this.methodDataHash);
        }
    };
}
exports.MethodDataContextMixin = MethodDataContextMixin;
function WorkflowContextMixin(superclass) {
    return class extends superclass {
        constructor(...params) {
            super(...params);
            const config = params[0];
            this._workflow = (config.context && config.context.workflow) || {};
            this.isEdited = false; // we always get the `defaultData` (recalculated from scratch, not persistent)
        }
        get workflow() {
            return this._workflow;
        }
    };
}
exports.WorkflowContextMixin = WorkflowContextMixin;
function JobContextMixin(superclass) {
    return class extends superclass {
        constructor(...params) {
            super(...params);
            const config = params[0];
            this._job = (config.context && config.context.job) || {};
            this.isEdited = false; // we always get the `defaultData` (recalculated from scratch, not persistent)
        }
        get job() {
            return this._job;
        }
    };
}
exports.JobContextMixin = JobContextMixin;
