import _ from 'underscore';
import lodash from "lodash";

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
    const headers = _.uniq(_.flatten(objects.map(x => _.keys(x))));
    const result = [headers];
    objects.forEach(x => {
        const row = [];
        headers.forEach(header => {
            row.push(x.hasOwnProperty(header) ? x[header] : null);
        });
        result.push(row);
    });

    return result;
}
