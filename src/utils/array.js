import lodash from "lodash";
import _ from "underscore";

export function safeMakeArray(x) {
    if (!lodash.isArray(x)) return [x];
    return x;
}

/**
 * @summary Returns objects array in compact csv format. E.g.:
 * [{a: 1, b: 2}, {a: 2, d: 3}] -> [['a','b','d'],[1, 2, null], [2, null, 3]]
 * @param objects
 */
export function convertToCompactCSVArrayOfObjects(objects) {
    const headers = _.uniq(_.flatten(objects.map((x) => _.keys(x))));
    const result = [headers];
    objects.forEach((x) => {
        const row = [];
        headers.forEach((header) => {
            // eslint-disable-next-line no-prototype-builtins
            row.push(x.hasOwnProperty(header) ? x[header] : null);
        });
        result.push(row);
    });

    return result;
}

/**
 * Check whether one array (probe) is contained within another (reference) by property.
 * @param {Object[]} probe - Array of objects (smaller set)
 * @param {Object[]} reference - Array of objects assumed to contain the probe array
 * @param {string} property - Name of object property to compare by
 * @return {boolean}
 */
export function isContainedByProperty(probe, reference, property) {
    // sort required for linear algorithm
    const probe_ = lodash.sortBy(probe, property);
    const reference_ = lodash.sortBy(reference, property);

    let j = 0;
    return probe_.reduce((isContained, currentObj) => {
        const val = lodash.get(currentObj, property);
        while (j < reference_.length && !lodash.isEqual(val, lodash.get(reference_[j], property))) {
            // eslint-disable-next-line no-plusplus
            j++;
        }
        // If we haven't found the current object in reference_ or
        // if the previous reduce iterations already returned false, return false
        return isContained && !(j === reference_.length);
    }, true);
}
