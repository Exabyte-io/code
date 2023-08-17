import { makeFlatSchemaKey, makeFlatSchemaRef } from "@exabyte-io/esse.js/lib/js/esse/schemaUtils";
import fs from "fs";
import { compile } from "json-schema-to-typescript";

/**
 * Compiles ESSE JSON schemas to TypeScript interfaces/types
 * @param {Object} globalSchema
 * @param {String} savePath
 * @returns {Promise<void>}
 * @example
 * await compileTS(esseSchema, "./dist/types.ts");
 */
export async function compileTS(globalSchema, savePath) {
    const preparedDefinitions = Object.entries(globalSchema.definitions).reduce(
        (newDefinitions, [key, schema]) => {
            if (schema.allOf && schema.properties) {
                /**
                 * The current version of json-schema-to-typescript ignores properties if there is allOf array in the schema.
                 * To fix the issue here we are creating a separate schema from properties and add it to the allOf array
                 */
                return [
                    ...newDefinitions,
                    [
                        key,
                        {
                            ...schema,
                            allOf: [...schema.allOf, makeFlatSchemaRef(`${schema.$id}-properties`)],
                            properties: null,
                        },
                    ],
                    [
                        makeFlatSchemaKey(`${schema.$id}-properties`),
                        {
                            $id: `${schema.$id}-properties`,
                            type: "object",
                            properties: schema.properties,
                        },
                    ],
                ];
            }

            return [...newDefinitions, [key, schema]];
        },
        [],
    );

    const compiled = await compile(
        {
            ...globalSchema,
            definitions: Object.fromEntries(preparedDefinitions),
        },
        "",
        {
            unreachableDefinitions: true,
            additionalProperties: false,
        },
    );

    // keep support of node.js 12 for unit tests
    await fs.promises.writeFile(savePath, compiled);
}
