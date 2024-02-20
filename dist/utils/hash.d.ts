/**
 * @summary Calculates hash of a given text.
 */
export declare function calculateHashFromString(message: string, hashFunction?: string): string;
/**
 * @summary Calculates hash of a given object.
 * @param obj object to hash. It must be serializable.
 * @param hashFunction hash function name.
 */
export declare function calculateHashFromObject(obj: object, hashFunction?: string): string;
export declare function removeTimestampableKeysFromConfig(config: object): {};
