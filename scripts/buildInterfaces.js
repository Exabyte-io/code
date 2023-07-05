const fs = require("fs");
const { compile } = require("json-schema-to-typescript");
const { makeFlatSchemaId, makeFlatSchemaRef } = require("@exabyte-io/esse.js/lib/js/esse/utils");

/**
 * Compiles ESSE JSON schemas to TypeScript interfaces/types
 * @param {Object} globalSchema
 * @param {String} savePath
 * @returns {Promise<void>}
 * @example
 * await compileTS(esseSchema, "./dist/types.ts");
 */
async function compileTS(globalSchema, savePath) {
    const preparedDefinitions = Object.entries(globalSchema.definitions).reduce(
        (newDefinitions, [key, schema]) => {
            if (schema.allOf && schema.properties) {
                return [
                    ...newDefinitions,
                    [
                        key,
                        {
                            ...schema,
                            allOf: [
                                ...schema.allOf,
                                makeFlatSchemaRef(`${schema.schemaId}-properties`),
                            ],
                            properties: null,
                        },
                    ],
                    [
                        makeFlatSchemaId(`${schema.schemaId}-properties`),
                        {
                            schemaId: `${schema.schemaId}-properties`,
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

    const compiled = await compile({
        ...globalSchema,
        definitions: Object.fromEntries(preparedDefinitions),
    });

    fs.writeFileSync(savePath, compiled);
}

module.exports = {
    compileTS,
};
