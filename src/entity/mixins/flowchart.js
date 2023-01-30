/* eslint-disable max-classes-per-file */
import lodash from "lodash";

import { addUnit, getUUID, removeUnit, replaceUnit } from "../../utils";

export const FlowchartEntityMixin = (superclass) => {
    return class extends superclass {
        constructor(config) {
            super(config);
            this._units = config?.units || [];
        }

        get units() {
            return this._units;
        }

        setUnits(units) {
            this._units = units;
        }

        addUnit(unit, index = -1) {
            this._units = addUnit(this.units, unit, index);
        }

        removeUnit(flowchartId) {
            this._units = removeUnit(this.units, flowchartId);
        }

        replaceUnit(unit, index) {
            this._units = replaceUnit(this.units, unit, index);
        }

        getUnit(flowchartId) {
            return this.units.find((x) => x.flowchartId === flowchartId);
        }

        getUnitIndexByFlowchartId(flowchartId) {
            return lodash.findIndex(this.units, (unit) => {
                return unit.flowchartId === flowchartId;
            });
        }
    };
};

export const FlowchartItemMixin = (superclass) => {
    return class extends superclass {
        constructor(config) {
            super(config);
            if (!config?.flowchartId) {
                this.setProp("flowchartId", getUUID());
            }
        }

        get flowchartId() {
            return this.prop("flowchartId");
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
};
