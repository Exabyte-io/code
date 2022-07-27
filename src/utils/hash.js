import CryptoJS from "crypto-js";
import _ from "underscore";

import { sortKeysDeepForObject } from "./object";

/**
 * @summary Calculates hash of a given text.
 * @param message {String} message to hash
 * @param hashFunction {String} hash function name.
 * @return {String}
 */
export function calculateHashFromString(message, hashFunction = "MD5") {
    switch (hashFunction) {
        case "MD5":
        default:
            return CryptoJS.MD5(message).toString();
    }
}

/**
 * @summary Calculates hash of a given object.
 * @param obj {Object} object to hash. It must be serializable.
 * @param hashFunction {String} hash function name.
 * @return {String}
 */
export function calculateHashFromObject(obj, hashFunction = "MD5") {
    const message = JSON.stringify(sortKeysDeepForObject(obj));
    return calculateHashFromString(message, hashFunction);
}

export function removeTimestampableKeysFromConfig(config) {
    return _.omit(config, ["createdAt", "updatedAt", "removedAt"]);
}
