import lodash from "lodash";
import _ from "underscore";

import { deepClone } from "./clone";

/**
 * @summary Safely convert input to { name: str } if it is not already
 * @param name {String|Object} the input to convert
 * @returns result {Object|null} converted object if any
 */
export function safeMakeObject(name) {
    if (!name) return;
    let result = name;
    if (lodash.isString(name)) result = { name };
    if (!lodash.isObject(result) || lodash.isArray(result) || !result.name)
        throw new Error(`safeMakeObject: failed creating named object, found ${result}`);
    return result;
}

/**
 * @summary Pluck a single entry out of an iterable according to an attribute and match condition
 * @param obj {Object|Array} iterable to pluck from
 * @param attribute {String} attribute to compare to value
 * @param value {Any} matching value
 * @returns filtered[0] {Any|null} first matching entry if found
 */
export function getOneMatchFromObject(obj, attribute, value) {
    const filtered = lodash.filter(obj, [attribute, value]);
    if (filtered.length !== 1) {
        console.log(`found ${filtered.length} ${attribute} matching ${value}, expected 1.`);
    }
    if (!filtered.length) {
        return;
    }
    return filtered[0];
}

/**
 * @summary Converts all keys of object to camelCase.
 * @param obj {Object}
 */
export function convertKeysToCamelCaseForObject(obj) {
    const newObj = deepClone(obj);
    return lodash.mapKeys(newObj, (v, k) => {
        return lodash.camelCase(k);
    });
}

/*
 * Renames keys inside the object. Looks for keys from keysOriginal above and uses the corresponding keysRenamed entry
 * @param {Object} object - Object to rename keys in
 * @param {Array} keysOriginal - List of keys to rename
 * @param {Array} keysRenamed - List of keys to rename original keys to, in the same order
 */
export function renameKeysForObject(o, keysOriginal = [], keysRenamed = []) {
    if (!lodash.isObject(o)) {
        return o;
    }

    if (lodash.isArray(o)) {
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

/**
 * @summary Converts object into string. Recursive. Required properties for object: "name", "value".
 * "units" property is ignored. Only one extra property is allowed. Function is called recursively on extraProperty.
 * E.g. {name: "propName", value: 1} -> 'propName=1'
 * {name: "propName", value: 1, extraProp: {name: "extraPropName", value: "2"}} -> "propName=1:extraPropName=2"
 * @param {Object} obj Object to stringify.
 * @param {String} [levelSeparator] ':' by default.
 * @param {String} [keyValueSeparator] '=' by default.
 * @param {String} [prefix] Empty by default.
 * @return {String}
 */
export function stringifyObject(obj, levelSeparator = ":", keyValueSeparator = "=", prefix = "") {
    const requiredKeys = ["name", "value"];
    const allowedKeys = requiredKeys.concat(["units"]);
    const extraKeys = _.keys(_.omit(obj, allowedKeys));

    // If there is more than one extra key, raise an exception
    if (extraKeys.length > 1) {
        throw new Error("stringifyObject: more than one extra property");
    }

    if (extraKeys.length === 0) {
        return `${obj.name}${keyValueSeparator}${obj.value}`;
    }

    const extraPropertyKey = extraKeys[0];
    const extraPropertyValue = obj[extraKeys[0]];

    // eslint-disable-next-line no-param-reassign
    prefix = _.isEmpty(prefix)
        ? `${obj.name}${keyValueSeparator}${obj.value}`
        : `${prefix}${levelSeparator}${obj.name}${keyValueSeparator}${obj.value}`;

    if (!_.isObject(extraPropertyValue)) {
        return `${prefix}:${extraPropertyKey}${keyValueSeparator}${extraPropertyValue}`;
    }

    return stringifyObject(extraPropertyValue, levelSeparator, keyValueSeparator, prefix);
}

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
export function flattenObject(obj, levelSeparator = ":", keyValueSeparator = "=", suffix) {
    const requiredKeys = ["name", "value"];
    const allowedKeys = requiredKeys.concat(["units"]);
    const extraKeys = _.keys(_.omit(obj, allowedKeys));

    // If there is more than one extra key, raise an exception
    if (extraKeys.length > 1) {
        throw new Error("flattenObject: more than one extra property");
    }

    const tailSuffix = _.isEmpty(suffix) ? "" : `${levelSeparator}${suffix}`;

    if (extraKeys.length === 0) {
        return { [`${obj.name}${tailSuffix}`]: obj.value };
    }

    const extraPropertyKey = extraKeys[0];
    const extraPropertyValue = obj[extraKeys[0]];

    if (!_.isObject(extraPropertyValue)) {
        return {
            [`${obj.name}${levelSeparator}${extraPropertyKey}=${extraPropertyValue}${tailSuffix}`]:
                obj.value,
        };
    }

    const flatSubObj = stringifyObject(extraPropertyValue, levelSeparator, keyValueSeparator);
    const key = `${obj.name}${levelSeparator}${flatSubObj}${tailSuffix}`;
    return { [key]: obj.value };
}

/**
 * Sort object keys alphabetically
 */
export function sortKeysDeepForObject(obj) {
    if (_.isArray(obj)) {
        return obj.map(sortKeysDeepForObject);
    }
    if (_.isObject(obj)) {
        const sortedObject = {};
        _.keys(obj)
            .sort()
            .map((key) => (sortedObject[key] = sortKeysDeepForObject(obj[key])));
        return sortedObject;
    }
    return obj;
}

/**
 * Merge terminal node values of an object tree.
 * @param {Object} tree - Nested object
 * @param {Boolean} unique - Whether merged list should consist of unique items
 * @return {Array} - Merged list of values of terminal nodes.
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
export function mergeTerminalNodes(tree, unique = false) {
    const terminalValues = lodash.values(tree).reduce((accumulator, value) => {
        if (lodash.isPlainObject(value)) {
            return accumulator.concat(mergeTerminalNodes(value));
        }
        return accumulator.concat(value);
    }, []);
    return unique ? [...new Set(terminalValues)] : terminalValues;
}

/**
 * @summary When given an object that contains many other objects as property values this
 * returns the first object that contains a specified field.
 * e.g.
 * MainObject: {
 *   obj1: {name: "object 1", value: 1},
 *   obj2: {name: "object 2", data: [1, 2, 3]},
 *   obj3: {},
 * }
 * findValueByField(MainObject, "value") -> obj1
 * @param {Object} object Object to stringify.
 * @param {String} fieldName Field to search child objects for.
 * @return {Object} First child object that contains the specified field
 */
function findChildObjectWithField(object, fieldName) {
    for (let key in object) {
        if (typeof(object[key]) !== "object") continue;
        if (object[key][fieldName]) {
            return object[key][fieldName];
        }
    }
    return null;  // Field not found
}