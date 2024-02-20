import { NameResultSchema } from "../esse/types";
/**
 * @summary Safely convert input to { name: str } if it is not already
 * @param name {String|Object} the input to convert
 * @returns result {Object|null} converted object if any
 */
export declare function safeMakeObject(name: string | NameResultSchema): NameResultSchema;
/**
 * @summary Pluck a single entry out of an iterable according to an attribute and match condition
 */
export declare function getOneMatchFromObject(obj: object, attribute: string, value: unknown): unknown;
/**
 * @summary Converts all keys of object to camelCase.
 */
export declare function convertKeysToCamelCaseForObject(obj: object): import("lodash").Dictionary<any>;
export declare function renameKeysForObject<T>(o: T, keysOriginal: string[], keysRenamed: string[]): T;
export interface NameValueObject {
    name: string;
    value: unknown;
    [key: string]: unknown;
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
 */
export declare function stringifyObject(obj: NameValueObject, levelSeparator?: string, keyValueSeparator?: string, prefix?: string): string;
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
export declare function flattenObject(obj: NameValueObject, levelSeparator?: string, keyValueSeparator?: string, suffix?: string | undefined): {
    [x: string]: unknown;
};
/**
 * Sort object keys alphabetically
 */
export declare function sortKeysDeepForObject<T>(obj: T): T;
interface Tree<T = string> {
    [key: string]: Tree<T> | T[];
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
export declare function mergeTerminalNodes<T = string>(tree: Tree<T>, unique?: boolean): T[];
export {};
