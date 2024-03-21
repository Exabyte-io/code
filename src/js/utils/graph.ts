import { InMemoryEntity } from "../entity/in_memory";

export type UnitEntity = InMemoryEntity & {
    head: boolean;
    next?: string;
    flowchartId: string;
};

/**
 * @summary Set the head of an array of units
 */
export function setUnitsHead(units: UnitEntity[]): UnitEntity[] {
    const [first, ...tail] = units;
    if (units.length > 0) {
        first.head = true;
        tail.map((x) => (x.head = false));
    }
    return units;
}

/**
 * @summary Re-establishes the linked `next => flowchartId` logic in an array of units
 */
export function setNextLinks(units: UnitEntity[]): UnitEntity[] {
    const flowchartIds = units.map((u) => u.flowchartId);
    for (let i = 0; i < units.length - 1; i++) {
        if (!units[i].next) {
            // newly added units don't have next set yet => set it
            units[i].next = units[i + 1].flowchartId;
            if (i > 0) units[i - 1].next = units[i].flowchartId;
        } else if (!flowchartIds.includes(units[i].next || "")) {
            // newly removed units may create broken next links => fix it
            units[i].next = units[i + 1].flowchartId;
        }
    }
    return units;
}

/**
 * Add unit to unit graph (by index or appending).
 */
export function addUnit(units: UnitEntity[], unit: UnitEntity, index = -1): UnitEntity[] {
    if (index >= 0 && index < units.length) {
        units.splice(index, 0, unit);
    } else {
        units.push(unit);
    }
    return setNextLinks(setUnitsHead(units));
}

/**
 * Remove unit based on flowchartId from unit graph.
 * @param {Unit[]} units
 * @param {string} flowchartId
 * @returns {Array}
 */
export function removeUnit(units: UnitEntity[], flowchartId: string): UnitEntity[] {
    const previousUnit = units.find((x) => x.next === flowchartId);
    if (previousUnit) previousUnit.unsetProp("next");
    // TODO: remove the setNextLinks and setUnitsHead and handle the logic via flowchart designer
    return setNextLinks(setUnitsHead(units.filter((x) => x.flowchartId !== flowchartId)));
}

/**
 * Replace a unit in a unit graph by index.
 * @param {Unit[]} units
 * @param {Unit} unit
 * @param {Number} index
 */
export function replaceUnit(units: UnitEntity[], unit: UnitEntity, index: number): UnitEntity[] {
    units[index] = unit;
    return setNextLinks(setUnitsHead(units));
}
