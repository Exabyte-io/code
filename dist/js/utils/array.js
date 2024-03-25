"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToCompactCSVArrayOfObjects = exports.safeMakeArray = void 0;
const lodash_1 = __importDefault(require("lodash"));
const underscore_1 = __importDefault(require("underscore"));
function safeMakeArray(x) {
    if (!lodash_1.default.isArray(x))
        return [x];
    return x;
}
exports.safeMakeArray = safeMakeArray;
/**
 * @summary Returns objects array in compact csv format. E.g.:
 * [{a: 1, b: 2}, {a: 2, d: 3}] -> [['a','b','d'],[1, 2, null], [2, null, 3]]
 * @param objects
 */
function convertToCompactCSVArrayOfObjects(objects) {
    const headers = underscore_1.default.uniq(underscore_1.default.flatten(objects.map((x) => underscore_1.default.keys(x))));
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
exports.convertToCompactCSVArrayOfObjects = convertToCompactCSVArrayOfObjects;
