// import { makeFlatSchemaKey, makeFlatSchemaRef } from "@exabyte-io/esse.js/lib/js/esse/schemaUtils";
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
    const compiled = await compile(
        {
            ...globalSchema,
            definitions: globalSchema.definitions,
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
