import lodash from "lodash";

import { addUnit, removeUnit, replaceUnit } from "../../utils";

export const FlowchartEntityMixin = (superclass) => {
    return class extends superclass {
        constructor(config) {
            super(config);
            this._units = config.units || [];
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

        unitIndex(flowchartId) {
            return lodash.findIndex(this.units, (unit) => {
                return unit.flowchartId === flowchartId;
            });
        }
    };
};
