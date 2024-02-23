import findIndex from "lodash/findIndex";

import { addUnit, getUUID, removeUnit, replaceUnit } from "../../utils";
import { UnitEntity } from "../../utils/graph";
import { InMemoryEntityConstructor } from "../in_memory";

export function FlowchartItemMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass implements UnitEntity {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...params: any[]) {
            super(...params);

            const config = params[0];

            if (!config?.flowchartId) {
                this.setProp("flowchartId", getUUID());
            }
        }

        get flowchartId(): string {
            return this.prop("flowchartId", "");
        }

        get head(): boolean {
            return this.prop("head", false);
        }

        set head(bool) {
            this.setProp("head", bool);
        }

        get next() {
            return this.prop("next");
        }

        set next(flowchartId: string | undefined) {
            this.setProp("next", flowchartId);
        }
    };
}

export function FlowchartEntityMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        _units: UnitEntity[];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...params: any[]) {
            super(...params);

            this._units = params[0]?.units || [];
        }

        get units() {
            return this._units;
        }

        setUnits(units: UnitEntity[]) {
            this._units = units;
        }

        addUnit(unit: UnitEntity, index = -1) {
            this._units = addUnit(this.units, unit, index);
        }

        removeUnit(flowchartId: string) {
            this._units = removeUnit(this.units, flowchartId);
        }

        replaceUnit(unit: UnitEntity, index: number) {
            this._units = replaceUnit(this.units, unit, index);
        }

        getUnit(flowchartId: string) {
            return this.units.find((x) => x.flowchartId === flowchartId);
        }

        getUnitIndexByFlowchartId(flowchartId: string) {
            return findIndex(this.units, (unit) => {
                return unit.flowchartId === flowchartId;
            });
        }
    };
}
