import { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
export type ValidateEntityDataOptions = {
    clean?: boolean;
    coerceTypes?: boolean;
};
/**
 * Validate (and optionally clean) entity data against a JSON schema.
 * Returns `data` unchanged when no schema is provided.
 */
export declare function validateEntityData(data: object, jsonSchema: JSONSchema | undefined, options?: ValidateEntityDataOptions): object;
