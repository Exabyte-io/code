#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */

/**
 * Script to generate mixin properties from JSON schema
 *
 * This script generates mixin functions for property/holder, property/meta_holder,
 * and property/proto_holder schemas automatically.
 *
 * Usage:
 *   node scripts/generate-mixin-properties.js
 */

import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import { execSync } from "child_process";
import fs from "fs";
import type { JSONSchema7 } from "json-schema";

/**
 * Determines if a property should use requiredProp() or prop()
 * @param propertyName - Name of the property
 * @param requiredProperties - Array of required property names
 * @returns - True if property is required
 */
function isRequiredProperty(propertyName: string, requiredProperties: string[]): boolean {
    return requiredProperties.includes(propertyName);
}

/**
 * Generates TypeScript type annotation for a property
 * @param propertyName - The property name
 * @param schemaName - Name of the schema (for type reference)
 * @returns - TypeScript type annotation
 */
function generateTypeAnnotation(propertyName: string, schemaName: string): string {
    return `${schemaName}["${propertyName}"]`;
}

/**
 * Extracts properties from a schema, handling allOf if present
 * @param schema - The JSON schema
 * @returns - Object with properties and required fields
 */
function extractSchemaProperties(schema: JSONSchema7): {
    properties: Record<string, unknown>;
    required: string[];
} {
    let properties: Record<string, unknown> = {};
    let required: string[] = [];

    // Handle allOf by merging properties from all schemas
    if (schema.allOf && Array.isArray(schema.allOf)) {
        for (const subSchema of schema.allOf) {
            const extracted = extractSchemaProperties(subSchema as JSONSchema7);
            properties = { ...properties, ...extracted.properties };
            required = [...required, ...extracted.required];
        }
    }

    // Add properties from current schema
    if (schema.properties) {
        properties = { ...properties, ...schema.properties };
    }
    if (schema.required) {
        required = [...required, ...schema.required];
    }

    return { properties, required };
}

/**
 * Generates the complete mixin function
 * @param schema - The JSON schema
 * @param schemaName - Name of the schema
 * @param mixinTypeName - Name of the mixin type
 * @param entityTypeName - Name of the entity type
 * @param skipFields - Array of field names to skip
 * @param from - Import path for the schema type (default: "@mat3ra/esse/dist/js/types")
 * @returns - Generated TypeScript code
 */
function generateMixinFunction(
    schema: JSONSchema7,
    schemaName: string,
    mixinTypeName: string,
    entityTypeName: string,
    skipFields: string[] = [],
    from = "@mat3ra/esse/dist/js/types",
): string {
    // Convert mixin type name to camelCase for function name
    const functionName = mixinTypeName.charAt(0).toLowerCase() + mixinTypeName.slice(1);

    // Extract properties, handling allOf if present
    const { properties, required } = extractSchemaProperties(schema);

    if (Object.keys(properties).length === 0) {
        throw new Error("No properties found in schema");
    }

    // Filter out skip fields
    const propertyEntries = Object.entries(properties).filter(
        ([propertyName]) => !skipFields.includes(propertyName),
    );

    let code = `import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";\n`;
    code += `import type { ${schemaName} } from "${from}";\n\n`;

    // Generate the mixin type using Omit utility
    const skipFieldNames = skipFields.map((field) => `"${field}"`).join(" | ");
    code += `export type ${mixinTypeName} = Omit<${schemaName}, ${skipFieldNames}>;\n\n`;

    // Generate the entity type
    code += `export type ${entityTypeName} = InMemoryEntity & ${mixinTypeName};\n\n`;

    code += `export function ${functionName}(item: InMemoryEntity) {\n`;
    code += `    // @ts-expect-error\n`;
    code += `    const properties: InMemoryEntity & ${mixinTypeName} = {\n`;

    for (let i = 0; i < propertyEntries.length; i++) {
        const [propertyName] = propertyEntries[i];
        const isRequired = isRequiredProperty(propertyName, required);
        const methodName = isRequired ? "requiredProp" : "prop";
        const typeAnnotation = generateTypeAnnotation(propertyName, schemaName);

        code += `get ${propertyName}() {\n`;
        code += `return this.${methodName}<${typeAnnotation}>("${propertyName}");\n`;
        code += `}`;

        // Add comma for all properties except the last one
        if (i < propertyEntries.length - 1) {
            code += `,\n`;
        } else {
            code += `,\n`;
        }
    }

    code += `    };\n\n`;
    code += `    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));\n`;
    code += `}\n`;

    return code;
}

/**
 * Generates mixin function for a given schema ID
 * @param schemaId - The schema ID (e.g., "property/holder")
 * @param outputPath - The output file path
 * @param skipFields - Array of field names to skip
 * @param from - Import path for the schema type (default: "@mat3ra/esse/dist/js/types")
 * @returns - Generated TypeScript code
 */
function generateMixinFromSchemaId(
    schemaId: string,
    outputPath: string,
    skipFields: string[] = [],
    from = "@mat3ra/esse/dist/js/types",
): string {
    // Get the resolved schema by ID
    const schema = JSONSchemasInterface.getSchemaById(schemaId);

    if (!schema) {
        throw new Error(`Schema not found with ID: ${schemaId}`);
    }

    // Extract schema name from title for import
    let schemaName;
    if (schema.title) {
        // Convert title to proper schema name
        schemaName = schema.title
            .split(/\s+/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");
    } else {
        // Convert schema ID to proper schema name
        schemaName =
            schemaId
                .split(/[/-]/)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join("") + "Schema";
    }

    // Extract type names from output file path
    const fileName = outputPath.split("/").pop()?.replace(".ts", "") ?? "";
    if (!fileName) {
        throw new Error(`Invalid output path: ${outputPath}`);
    }

    const mixinTypeName = fileName;
    const entityTypeName = fileName.replace("SchemaMixin", "InMemoryEntity");

    // Generate the complete mixin function
    return generateMixinFunction(
        schema,
        schemaName,
        mixinTypeName,
        entityTypeName,
        skipFields,
        from,
    );
}

/**
 * Runs ESLint autofix on generated files
 * @param filePaths - Array of file paths to fix
 */
function runESLintAutofix(filePaths: string[]): void {
    if (filePaths.length === 0) return;

    try {
        console.log("Running ESLint autofix on generated files...");
        const filesToFix = filePaths.join(" ");
        execSync(`npx eslint --fix ${filesToFix}`, { stdio: "inherit" });
        console.log("✓ ESLint autofix completed successfully");
    } catch (error) {
        console.warn(
            "⚠ ESLint autofix failed:",
            error instanceof Error ? error.message : String(error),
        );
        // Don't fail the entire process if ESLint autofix fails
    }
}

/**
 * Generates mixins for multiple schemas
 * @param schemas - Array of JSON schemas to use for generation
 * @param outputPaths - Object mapping schema IDs to output file paths
 * @param skipFields - Array of field names to skip during generation
 * @param from - Import path for the schema type (default: "@mat3ra/esse/dist/js/types")
 * @returns - Object with success and error counts
 */
function generateShemaMixin(
    schemas: JSONSchema7[],
    outputPaths: Record<string, string>,
    skipFields: string[] = [],
    from = "@mat3ra/esse/dist/js/types",
) {
    // Setup schemas
    JSONSchemasInterface.setSchemas(schemas);

    console.log("Generating mixin properties for all schemas...");

    const schemaIds = Object.keys(outputPaths);
    let successCount = 0;
    let errorCount = 0;
    const generatedFiles = [];

    for (const schemaId of schemaIds) {
        try {
            console.log(`\nProcessing schema: ${schemaId}`);

            const outputPath = outputPaths[schemaId];
            if (!outputPath) {
                throw new Error(`No output path defined for schema: ${schemaId}`);
            }

            const generatedCode = generateMixinFromSchemaId(schemaId, outputPath, skipFields, from);

            // Ensure the directory exists
            const dir = outputPath.substring(0, outputPath.lastIndexOf("/"));
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(outputPath, generatedCode);
            console.log(`✓ Generated mixin written to: ${outputPath}`);
            generatedFiles.push(outputPath);
            successCount += 1;
        } catch (error) {
            console.error(
                `✗ Error processing schema ${schemaId}: ${
                    error instanceof Error ? error.message : String(error)
                }`,
            );
            errorCount += 1;
        }
    }

    // Run ESLint autofix on generated files
    if (generatedFiles.length > 0) {
        runESLintAutofix(generatedFiles);
    }

    console.log(`\n=== Summary ===`);
    console.log(`Successfully generated: ${successCount} mixins`);
    if (errorCount > 0) {
        console.log(`Errors: ${errorCount} schemas failed`);
    } else {
        console.log("All mixins generated successfully!");
    }

    return { successCount, errorCount };
}

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
