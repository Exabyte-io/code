"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterEntityList = void 0;
const uniqBy_1 = __importDefault(require("lodash/uniqBy"));
/**
 * Check if one path matches regular expression or exact string.
 */
function isPathSupported(pathObject, filterObjects) {
    return filterObjects.some((filterObj) => {
        if (filterObj.path) {
            return filterObj.path === pathObject.path;
        }
        if (filterObj.regex) {
            return filterObj.regex.test(pathObject.path);
        }
        return false;
    });
}
/**
 * Check if _all_ paths in concatenated path match filtering conditions.
 * @param {{path: string}} pathObject - Path object with concatenated path (multipath)
 * @param {string} multiPathSeparator - String sequence used for concatenation of paths
 * @param {Array<{path: string}|{regex: RegExp}>} filterObjects - Filter conditions
 * @return {boolean}
 */
function isMultiPathSupported(pathObject, multiPathSeparator, filterObjects) {
    const expandedPaths = pathObject.path.split(multiPathSeparator).map((p) => ({ path: p }));
    return expandedPaths.every((expandedPath) => isPathSupported(expandedPath, filterObjects));
}
/**
 * Filter list of entity paths or entities by paths and regular expressions.
 * @return {Object[]} - filtered entity path objects or entities
 */
function filterEntityList({ entitiesOrPaths, filterObjects = [], multiPathSeparator = "" }) {
    if (!filterObjects || !filterObjects.length) return [];
    const filterObjects_ = filterObjects.map((o) => (o.regex ? { regex: new RegExp(o.regex) } : o));
    let filtered;
    if (multiPathSeparator) {
        filtered = entitiesOrPaths.filter((e) =>
            isMultiPathSupported(e, multiPathSeparator, filterObjects_),
        );
    } else {
        filtered = entitiesOrPaths.filter((e) => isPathSupported(e, filterObjects_));
    }
    return (0, uniqBy_1.default)(filtered, "path");
}
exports.filterEntityList = filterEntityList;
