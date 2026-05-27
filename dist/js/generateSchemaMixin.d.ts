#!/usr/bin/env node
import type { JSONSchema7 } from "json-schema";
/**
 * Generates mixins for multiple schemas
 * @param schemas - Array of JSON schemas to use for generation
 * @param outputPaths - Object mapping schema IDs to output file paths
 * @param skipFields - Array of field names to skip during generation
 * @param from - Import path for the schema type (default: "@mat3ra/esse/dist/js/types")
 * @param entityFrom - Import path for the entity type (default: "@mat3ra/code/dist/js/entity")
 * @returns - Object with success and error counts
 */
declare function generateShemaMixin(schemas: JSONSchema7[], outputPaths: Record<string, string>, skipFields?: string[], from?: string, entityFrom?: string): {
    successCount: number;
    errorCount: number;
};
/**
 * @example
 * ```ts
 * import generateShemaMixin from "@mat3ra/code/dist/js/generateSchemaMixin";
 * import allSchemas from "@mat3ra/esse/dist/js/schemas.json";
 *
 * const result = generateShemaMixin(allSchemas, OUTPUT_PATHS, SKIP_FIELDS);
 *
 * if (result.errorCount > 0) {
 *     process.exit(1);
 * }
 * ```
 */
export default generateShemaMixin;
