import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { NameResultSchema } from "@mat3ra/esse/dist/js/types";
import camelCase from "lodash/camelCase";
import filterObject from "lodash/filter";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";
import isPlainObject from "lodash/isPlainObject";
import isString from "lodash/isString";
import mapKeys from "lodash/mapKeys";
import omit from "lodash/omit";

import { safeMakeArray } from "./array";
import { deepClone } from "./clone";

/**
 * @summary Safely convert input to { name: str } if it is not already
 * @param name {String|Object} the input to convert
 * @returns result {Object|null} converted object if any
 */
export function safeMakeObject(name: string | NameResultSchema): NameResultSchema {
    if (!name) {
        throw new Error("safeMakeObject: name is required");
    }

    const result: NameResultSchema = isString(name) ? { name } : name;

    if (!isObject(result) || isArray(result) || !result.name) {
        throw new Error(`safeMakeObject: failed creating named object, found ${result}`);
    }

    return result;
}

/**
 * @summary Pluck a single entry out of an iterable according to an attribute and match condition
 */
export function getOneMatchFromObject(obj: object, attribute: string, value: unknown): unknown {
    const filtered = filterObject(obj, [attribute, value]);
    if (filtered.length !== 1) {
        console.log(`found ${filtered.length} ${attribute} matching ${value}, expected 1.`);
    }
    if (!filtered.length) {
        return null;
    }
    return filtered[0];
}

/**
 * @summary Converts all keys of object to camelCase.
 */
export function convertKeysToCamelCaseForObject(obj: object) {
    const newObj = deepClone(obj);
    return mapKeys(newObj, (_v, k) => camelCase(k));
}

/*
 * Renames keys inside the object. Looks for keys from keysOriginal above and uses the corresponding keysRenamed entry
 * @param {Object} object - Object to rename keys in
 * @param {Array} keysOriginal - List of keys to rename
 * @param {Array} keysRenamed - List of keys to rename original keys to, in the same order
 */
export function renameKeysForObject<T>(o: T, keysOriginal: string[], keysRenamed: string[]): T;

export function renameKeysForObject(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    o: any,
    keysOriginal: string[] = [],
    keysRenamed: string[] = [],
): AnyObject | AnyObject[] {
    if (!isObject(o)) {
        return o;
    }

    if (isArray(o)) {
        return o.map((x) => renameKeysForObject(x, keysOriginal, keysRenamed));
    }

    const result: AnyObject = {};

    Object.entries(o).map(([origKey, origValue]) => {
        // Get the destination key
        const idx = keysOriginal.indexOf(origKey);
        const destKey = idx === -1 ? origKey : keysRenamed[idx];
        result[destKey] =
            typeof origValue === "object"
                ? renameKeysForObject(origValue, keysOriginal, keysRenamed)
                : origValue;
        return null;
    });
    return result;
}

export type NameValueObject = {
    name: string;
    value: unknown;
    units?: string;
};

export type NameValueObjectExtended = NameValueObject & {
    [key: string]: NameValueObject | string | number | undefined;
};

/**
 * @summary Converts object into string. Recursive. Required properties for object: "name", "value".
 * "units" property is ignored. Only one extra property is allowed. Function is called recursively on extraProperty.
 * E.g. {name: "propName", value: 1} -> 'propName=1'
 * {name: "propName", value: 1, extraProp: {name: "extraPropName", value: "2"}} -> "propName=1:extraPropName=2"
 */
export function stringifyObject(
    obj: NameValueObject,
    levelSeparator = ":",
    keyValueSeparator = "=",
    prefix = "",
): string {
    const requiredKeys = ["name", "value"];
    const allowedKeys = requiredKeys.concat(["units"]);
    const extraKeys = Object.keys(omit(obj, allowedKeys));

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
    prefix = isEmpty(prefix)
        ? `${obj.name}${keyValueSeparator}${obj.value}`
        : `${prefix}${levelSeparator}${obj.name}${keyValueSeparator}${obj.value}`;

    if (!isObject(extraPropertyValue)) {
        return `${prefix}:${extraPropertyKey}${keyValueSeparator}${extraPropertyValue}`;
    }

    // @ts-ignore
    return stringifyObject(extraPropertyValue, levelSeparator, keyValueSeparator, prefix);
}

/**
 * @summary Flattens complex object into object with single key-value pair.  Required properties for object: "name", "value".
 * "units" property is ignored. Only one extra property is allowed. E.g.
 * {name: 'propName', value: 1} -> {propName: 1}
 * {name: "propName", value: 1, extraProp: {name: "extraPropName", value: "2"}} -> {"propName:extraPropName=2": 1}
 */
// eslint-disable-next-line default-param-last
export function flattenObject(
    obj: NameValueObjectExtended,
    levelSeparator = ":",
    keyValueSeparator = "=",
    suffix: string | undefined = undefined,
) {
    const requiredKeys = ["name", "value"];
    const allowedKeys = requiredKeys.concat(["units"]);
    const extraKeys = Object.keys(omit(obj, allowedKeys));

    // If there is more than one extra key, raise an exception
    if (extraKeys.length > 1) {
        throw new Error("flattenObject: more than one extra property");
    }

    const tailSuffix = isEmpty(suffix) ? "" : `${levelSeparator}${suffix}`;

    if (extraKeys.length === 0) {
        return { [`${obj.name}${tailSuffix}`]: obj.value };
    }

    const extraPropertyKey = extraKeys[0];
    const extraPropertyValue = obj[extraKeys[0]];

    if (!isObject(extraPropertyValue)) {
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
export function sortKeysDeepForObject<T>(obj: T): T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortKeysDeepForObject(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(sortKeysDeepForObject);
    }
    if (isObject(obj)) {
        const sortedObject = {};
        Object.keys(obj)
            .sort()
            // @ts-ignore
            .map((key) => (sortedObject[key] = sortKeysDeepForObject(obj[key])));
        return sortedObject;
    }
    return obj;
}

interface Tree<T = string> {
    [key: string]: Tree<T> | T[];
}

function isTreeObject<T>(value: unknown): value is Tree<T> {
    return isPlainObject(value);
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
export function mergeTerminalNodes<T = string>(tree: Tree<T>, unique = false): T[] {
    if (!isTreeObject<T>(tree)) return safeMakeArray(tree);
    const terminalValues = Object.values(tree).reduce((accumulator: T[], value) => {
        if (isTreeObject<T>(value)) {
            return accumulator.concat(mergeTerminalNodes(value));
        }
        return accumulator.concat(value);
    }, [] as T[]);
    // @ts-ignore
    return unique ? [...new Set(terminalValues)] : terminalValues;
}
