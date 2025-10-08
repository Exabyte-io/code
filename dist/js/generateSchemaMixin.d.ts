#!/usr/bin/env node
/**
 * Generates mixins for multiple schemas
 * @param outputPaths - Object mapping schema IDs to output file paths
 * @param skipFields - Array of field names to skip during generation
 * @returns - Object with success and error counts
 */
declare function generateShemaMixin(outputPaths: Record<string, string>, skipFields?: string[]): {
    successCount: number;
    errorCount: number;
};
/**
 * @example
 * ```ts
 * import generateShemaMixin from "@mat3ra/code/dist/js/generateSchemaMixin";
 *
 * const result = generateShemaMixin(OUTPUT_PATHS, SKIP_FIELDS);
 *
 * if (result.errorCount > 0) {
 *     process.exit(1);
 * }
 * ```
 */
export default generateShemaMixin;
