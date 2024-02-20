export function safeMakeArray(x: any): any[];
/**
 * @summary Returns objects array in compact csv format. E.g.:
 * [{a: 1, b: 2}, {a: 2, d: 3}] -> [['a','b','d'],[1, 2, null], [2, null, 3]]
 * @param objects
 */
export function convertToCompactCSVArrayOfObjects(objects: any): any[][];
