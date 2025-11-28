#!/usr/bin/env node

/**
 * Script to generate mixin properties from JSON schema
 *
 * This script generates mixin functions for property/holder, property/meta_holder,
 * and property/proto_holder schemas automatically.
 *
 * Usage:
 *   npx ts-node scripts/generate-mixin-properties.ts
 */

import allSchemas from "@mat3ra/esse/dist/js/schemas.json";
import type { JSONSchema7 } from "json-schema";

import generateSchemaMixin from "../dist/js/generateSchemaMixin";

/**
 * Fields to skip during generation
 */
const SKIP_FIELDS: string[] = [];

/**
 * Output file paths for each schema
 */
const OUTPUT_PATHS = {
    "system/defaultable": "src/js/generated/DefaultableSchemaMixin.ts",
    "system/has-consistency-check": "src/js/generated/HasConsistencyChecksSchemaMixin.ts",
    "system/description": "src/js/generated/HasDescriptionSchemaMixin.ts",
    // "system/metadata": "src/js/generated/HasMetadataSchemaMixin.ts",
    "system/name": "src/js/generated/NamedEntitySchemaMixin.ts",
    "system/tags": "src/js/generated/TaggableSchemaMixin.ts",
    "system/runtime-items": "src/js/generated/RuntimeItemsSchemaMixin.ts",
};

function main() {
    // Type assertion to handle schema compatibility - the schemas from esse may have slightly different types
    const result = generateSchemaMixin(
        allSchemas as JSONSchema7[],
        OUTPUT_PATHS,
        SKIP_FIELDS,
        undefined,
        "../entity/in_memory",
    );

    if (result.errorCount > 0) {
        process.exit(1);
    }
}

// Run the script if it's executed directly
main();
