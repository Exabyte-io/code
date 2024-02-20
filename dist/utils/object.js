"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeTerminalNodes =
    exports.sortKeysDeepForObject =
    exports.flattenObject =
    exports.stringifyObject =
    exports.renameKeysForObject =
    exports.convertKeysToCamelCaseForObject =
    exports.getOneMatchFromObject =
    exports.safeMakeObject =
        void 0;
const camelCase_1 = __importDefault(require("lodash/camelCase"));
const filter_1 = __importDefault(require("lodash/filter"));
const isArray_1 = __importDefault(require("lodash/isArray"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const isObject_1 = __importDefault(require("lodash/isObject"));
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const isString_1 = __importDefault(require("lodash/isString"));
const mapKeys_1 = __importDefault(require("lodash/mapKeys"));
const omit_1 = __importDefault(require("lodash/omit"));
const array_1 = require("./array");
const clone_1 = require("./clone");
/**
 * @summary Safely convert input to { name: str } if it is not already
 * @param name {String|Object} the input to convert
 * @returns result {Object|null} converted object if any
 */
function safeMakeObject(name) {
    if (!name) {
        throw new Error("safeMakeObject: name is required");
    }
    const result = (0, isString_1.default)(name) ? { name } : name;
    if (!(0, isObject_1.default)(result) || (0, isArray_1.default)(result) || !result.name) {
        throw new Error(`safeMakeObject: failed creating named object, found ${result}`);
    }
    return result;
}
exports.safeMakeObject = safeMakeObject;
/**
 * @summary Pluck a single entry out of an iterable according to an attribute and match condition
 */
function getOneMatchFromObject(obj, attribute, value) {
    const filtered = (0, filter_1.default)(obj, [attribute, value]);
    if (filtered.length !== 1) {
        console.log(`found ${filtered.length} ${attribute} matching ${value}, expected 1.`);
    }
    if (!filtered.length) {
        return null;
    }
    return filtered[0];
}
exports.getOneMatchFromObject = getOneMatchFromObject;
/**
 * @summary Converts all keys of object to camelCase.
 */
function convertKeysToCamelCaseForObject(obj) {
    const newObj = (0, clone_1.deepClone)(obj);
    return (0, mapKeys_1.default)(newObj, (v, k) => (0, camelCase_1.default)(k));
}
exports.convertKeysToCamelCaseForObject = convertKeysToCamelCaseForObject;
function renameKeysForObject(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    o,
    keysOriginal = [],
    keysRenamed = [],
) {
    if (!(0, isObject_1.default)(o)) {
        return o;
    }
    if ((0, isArray_1.default)(o)) {
        return o.map((x) => renameKeysForObject(x, keysOriginal, keysRenamed));
    }
    const result = {};
    Object.entries(o).map(([origKey, origValue]) => {
        // Get the destination key
        const idx = keysOriginal.indexOf(origKey);
        const destKey = idx === -1 ? origKey : keysRenamed[idx];
        const destValue =
            typeof origValue === "object"
                ? renameKeysForObject(origValue, keysOriginal, keysRenamed)
                : origValue;
        result[destKey] = destValue;
        return null;
    });
    return result;
}
exports.renameKeysForObject = renameKeysForObject;
/**
 * @summary Converts object into string. Recursive. Required properties for object: "name", "value".
 * "units" property is ignored. Only one extra property is allowed. Function is called recursively on extraProperty.
 * E.g. {name: "propName", value: 1} -> 'propName=1'
 * {name: "propName", value: 1, extraProp: {name: "extraPropName", value: "2"}} -> "propName=1:extraPropName=2"
 * @param {Object} obj Object to stringify.
 * @param {String} [levelSeparator] ':' by default.
 * @param {String} [keyValueSeparator] '=' by default.
 * @param {String} [prefix] Empty by default.
 */
function stringifyObject(obj, levelSeparator = ":", keyValueSeparator = "=", prefix = "") {
    const requiredKeys = ["name", "value"];
    const allowedKeys = requiredKeys.concat(["units"]);
    const extraKeys = Object.keys((0, omit_1.default)(obj, allowedKeys));
    // If there is more than one extra key, raise an exception
    if (extraKeys.length > 1) {
        throw new Error("stringifyObject: more than one extra property");
    }
    if (extraKeys.length === 0) {
        return `${obj.name}${keyValueSeparator}${obj.value}`;
    }
    const extraPropertyKey = extraKeys[0];
    // @ts-ignore
    const extraPropertyValue = obj[extraKeys[0]];
    // eslint-disable-next-line no-param-reassign
    prefix = (0, isEmpty_1.default)(prefix)
        ? `${obj.name}${keyValueSeparator}${obj.value}`
        : `${prefix}${levelSeparator}${obj.name}${keyValueSeparator}${obj.value}`;
    if (!(0, isObject_1.default)(extraPropertyValue)) {
        return `${prefix}:${extraPropertyKey}${keyValueSeparator}${extraPropertyValue}`;
    }
    // @ts-ignore
    return stringifyObject(extraPropertyValue, levelSeparator, keyValueSeparator, prefix);
}
exports.stringifyObject = stringifyObject;
/**
 * @summary Flattens complex object into object with single key-value pair.  Required properties for object: "name", "value".
 * "units" property is ignored. Only one extra property is allowed. E.g.
 * {name: 'propName', value: 1} -> {propName: 1}
 * {name: "propName", value: 1, extraProp: {name: "extraPropName", value: "2"}} -> {"propName:extraPropName=2": 1}
 * @param {Object} obj Object to stringify.
 * @param {String} [levelSeparator] ':' by default.
 * @param {String} [keyValueSeparator] '=' by default.
 * @param {String} [suffix]
 * @return {Object}
 */
// eslint-disable-next-line default-param-last
function flattenObject(obj, levelSeparator = ":", keyValueSeparator = "=", suffix = undefined) {
    const requiredKeys = ["name", "value"];
    const allowedKeys = requiredKeys.concat(["units"]);
    const extraKeys = Object.keys((0, omit_1.default)(obj, allowedKeys));
    // If there is more than one extra key, raise an exception
    if (extraKeys.length > 1) {
        throw new Error("flattenObject: more than one extra property");
    }
    const tailSuffix = (0, isEmpty_1.default)(suffix) ? "" : `${levelSeparator}${suffix}`;
    if (extraKeys.length === 0) {
        return { [`${obj.name}${tailSuffix}`]: obj.value };
    }
    const extraPropertyKey = extraKeys[0];
    const extraPropertyValue = obj[extraKeys[0]];
    if (!(0, isObject_1.default)(extraPropertyValue)) {
        return {
            [`${obj.name}${levelSeparator}${extraPropertyKey}=${extraPropertyValue}${tailSuffix}`]:
                obj.value,
        };
    }
    const flatSubObj = stringifyObject(extraPropertyValue, levelSeparator, keyValueSeparator);
    const key = `${obj.name}${levelSeparator}${flatSubObj}${tailSuffix}`;
    return { [key]: obj.value };
}
exports.flattenObject = flattenObject;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortKeysDeepForObject(obj) {
    if (Array.isArray(obj)) {
        return obj.map(sortKeysDeepForObject);
    }
    if ((0, isObject_1.default)(obj)) {
        const sortedObject = {};
        Object.keys(obj)
            .sort()
            // @ts-ignore
            .map((key) => (sortedObject[key] = sortKeysDeepForObject(obj[key])));
        return sortedObject;
    }
    return obj;
}
exports.sortKeysDeepForObject = sortKeysDeepForObject;
function isTreeObject(value) {
    return (0, isPlainObject_1.default)(value);
}
/**
 * Merge terminal node values of an object tree.
 * @param tree - Nested object
 * @param unique - Whether merged list should consist of unique items
 * @return Merged list of values of terminal nodes.
 * @example
 * const tree = {
 *     level1: {
 *         level2a: {
 *             level3a: {
 *                 key1: ['a', 'b', 'c'],
 *             },
 *             level3b: {
 *                 key2: ['d', 'e', 'f'],
 *             },
 *         },
 *         level2b: {
 *             level3c: {
 *                 key3: ['g', 'h', 'i'],
 *             },
 *             level3d: {
 *                 key4: ['j', 'k', 'l'],
 *             },
 *         },
 *     },
 * };
 * mergeTerminalNodes(tree); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
 */
function mergeTerminalNodes(tree, unique = false) {
    if (!isTreeObject(tree)) return (0, array_1.safeMakeArray)(tree);
    const terminalValues = Object.values(tree).reduce((accumulator, value) => {
        if (isTreeObject(value)) {
            return accumulator.concat(mergeTerminalNodes(value));
        }
        return accumulator.concat(value);
    }, []);
    // @ts-ignore
    return unique ? [...new Set(terminalValues)] : terminalValues;
}
exports.mergeTerminalNodes = mergeTerminalNodes;
