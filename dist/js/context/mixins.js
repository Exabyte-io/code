"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobContextMixin = exports.WorkflowContextMixin = exports.MethodDataContextMixin = exports.MaterialsContextMixin = exports.MaterialContextMixin = void 0;
exports.ApplicationContextMixin = ApplicationContextMixin;
exports.MaterialsSetContextMixin = MaterialsSetContextMixin;
const utils_1 = require("../entity/set/ordered/utils");
const JobContextMixin_1 = require("./JobContextMixin");
Object.defineProperty(exports, "JobContextMixin", { enumerable: true, get: function () { return JobContextMixin_1.JobContextMixin; } });
const MaterialContextMixin_1 = require("./MaterialContextMixin");
Object.defineProperty(exports, "MaterialContextMixin", { enumerable: true, get: function () { return MaterialContextMixin_1.MaterialContextMixin; } });
const MaterialsContextMixin_1 = require("./MaterialsContextMixin");
Object.defineProperty(exports, "MaterialsContextMixin", { enumerable: true, get: function () { return MaterialsContextMixin_1.MaterialsContextMixin; } });
const MethodDataContextMixin_1 = require("./MethodDataContextMixin");
Object.defineProperty(exports, "MethodDataContextMixin", { enumerable: true, get: function () { return MethodDataContextMixin_1.MethodDataContextMixin; } });
const WorkflowContextMixin_1 = require("./WorkflowContextMixin");
Object.defineProperty(exports, "WorkflowContextMixin", { enumerable: true, get: function () { return WorkflowContextMixin_1.WorkflowContextMixin; } });
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
