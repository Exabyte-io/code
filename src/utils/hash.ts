import CryptoJS from "crypto-js";

import { sortKeysDeepForObject } from "./object";

/**
 * @summary Calculates hash of a given text.
 */
export function calculateHashFromString(message: string, hashFunction = "MD5"): string {
    switch (hashFunction) {
        case "MD5":
        default:
            return CryptoJS.MD5(message).toString();
    }
}

/**
 * @summary Calculates hash of a given object.
 * @param obj object to hash. It must be serializable.
 * @param hashFunction hash function name.
 */
export function calculateHashFromObject(obj: object, hashFunction = "MD5"): string {
    const message = JSON.stringify(sortKeysDeepForObject(obj));
    return calculateHashFromString(message, hashFunction);
}

export function removeTimestampableKeysFromConfig(config: object) {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, removedAt, ...restConfig } = config;
    return restConfig;
}
