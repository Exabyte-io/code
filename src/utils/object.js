import lodash from "lodash";

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
