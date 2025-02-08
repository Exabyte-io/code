"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartItemMixin = FlowchartItemMixin;
exports.FlowchartEntityMixin = FlowchartEntityMixin;
const findIndex_1 = __importDefault(require("lodash/findIndex"));
const utils_1 = require("../../utils");
function FlowchartItemMixin(superclass) {
    return class extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...params) {
            super(...params);
            const config = params[0];
            if (!(config === null || config === void 0 ? void 0 : config.flowchartId)) {
                this.setProp("flowchartId", (0, utils_1.getUUID)());
            }
        }
        get flowchartId() {
            return this.prop("flowchartId", "");
        }
        get head() {
            return this.prop("head", false);
        }
        set head(bool) {
            this.setProp("head", bool);
        }
        get next() {
            return this.prop("next");
        }
        set next(flowchartId) {
            this.setProp("next", flowchartId);
        }
    };
}
function FlowchartEntityMixin(superclass) {
    return class extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...params) {
            var _a;
            super(...params);
            this._units = ((_a = params[0]) === null || _a === void 0 ? void 0 : _a.units) || [];
        }
        get units() {
            return this._units;
        }
        setUnits(units) {
            this._units = units;
        }
        addUnit(unit, index = -1) {
            this._units = (0, utils_1.addUnit)(this.units, unit, index);
        }
        removeUnit(flowchartId) {
            this._units = (0, utils_1.removeUnit)(this.units, flowchartId);
        }
        replaceUnit(unit, index) {
            this._units = (0, utils_1.replaceUnit)(this.units, unit, index);
        }
        getUnit(flowchartId) {
            return this.units.find((x) => x.flowchartId === flowchartId);
        }
        getUnitIndexByFlowchartId(flowchartId) {
            return (0, findIndex_1.default)(this.units, (unit) => {
                return unit.flowchartId === flowchartId;
            });
        }
    };
}
