import { InMemoryEntity } from "../entity/in_memory";
export type UnitEntity = InMemoryEntity & {
    head: boolean;
    next?: string;
    flowchartId: string;
};
/**
 * @summary Set the head of an array of units
 */
export declare function setUnitsHead(units: UnitEntity[]): UnitEntity[];
/**
 * @summary Re-establishes the linked `next => flowchartId` logic in an array of units
 */
export declare function setNextLinks(units: UnitEntity[]): UnitEntity[];
/**
 * Add unit to unit graph (by index or appending).
 */
export declare function addUnit(units: UnitEntity[], unit: UnitEntity, index?: number): UnitEntity[];
/**
 * Remove unit based on flowchartId from unit graph.
 * @param {Unit[]} units
 * @param {string} flowchartId
 * @returns {Array}
 */
export declare function removeUnit(units: UnitEntity[], flowchartId: string): UnitEntity[];
/**
 * Replace a unit in a unit graph by index.
 * @param {Unit[]} units
 * @param {Unit} unit
 * @param {Number} index
 */
export declare function replaceUnit(units: UnitEntity[], unit: UnitEntity, index: number): UnitEntity[];
