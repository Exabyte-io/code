/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import fs from "fs";
import { compile } from "json-schema-to-typescript";
import path from "path";

async function walkDir(dir, callback) {
    const files = await fs.promises.readdir(dir);
    for (const file of files) {
        const dirPath = path.join(dir, file);
        const stat = await fs.promises.stat(dirPath);
        if (stat.isDirectory()) {
            await walkDir(dirPath, callback);
        } else {
            await callback(path.join(dir, file));
        }
    }
}

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

export async function compileNewTS(schemaPath, savePath) {
    // const compiled = await compile(
    //     {
    //         ...globalSchema,
    //         definitions: globalSchema.definitions,
    //     },
    //     "",
    //     {
    //         unreachableDefinitions: true,
    //         additionalProperties: false,
    //     },
    // );

    walkDir(schemaPath, async (filePath) => {
        console.log({
            filePath,
        });

        const data = await fs.promises.readFile("file", "utf8");
        const schema = JSON.parse(data);

        // keep support of node.js 12 for unit tests
        await fs.promises.appendFile(savePath, `${schema} \n`);
    });

    // keep support of node.js 12 for unit tests
    // await fs.promises.writeFile(savePath, compiled);
}
