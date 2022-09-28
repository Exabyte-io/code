/**
 * @summary Set the head of an array of units
 * @param {Array} units
 * @returns {Array} units
 */
export function setUnitsHead(units) {
    const [first, ...tail] = units;
    const inOrder = first.head && tail.every((u) => u.head === false);
    if (units.length > 0 && !inOrder) {
        first.head = true;
        tail.map((x) => (x.head = false));
    }
    return units;
}

/**
 * @summary Re-establishes the linked `next => flowchartId` logic in an array of units
 * @params {Array} units
 * @returns {Array} units
 */
export function setNextLinks(units) {
    const flowchartIds = units.map((u) => u.flowchartId);
    for (let i = 0; i < units.length - 1; i++) {
        if (!units[i].next) {
            // newly added units don't have next set yet => set it
            units[i].next = units[i + 1].flowchartId;
            if (i > 0) units[i - 1].next = units[i].flowchartId;
        } else if (!flowchartIds.includes(units[i].next)) {
            // newly removed units may create broken next links => fix it
            units[i].next = units[i + 1].flowchartId;
        }
    }
    return units;
}
