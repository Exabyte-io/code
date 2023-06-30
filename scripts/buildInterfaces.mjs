/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import directoryTree from "directory-tree";
import fs from "fs/promises";
import { compileFromFile } from "json-schema-to-typescript";
import path from "path";

const typesPath = "./dist/types.ts";
const schemaFolder = "node_modules/@exabyte-io/esse.js/schema";

await fs.writeFile(typesPath, "/* eslint-disable */\n\n");

const tree = directoryTree(schemaFolder, { extensions: /\.json$/ });

async function walkTree({ children }, cb) {
    for (const item of children || []) {
        if (item.children) {
            await walkTree(item, cb);
        } else {
            await cb(item);
        }
    }
}

const typesHash = {};

await walkTree(tree, async (item) => {
    const ts = await compileFromFile(item.path, {
        cwd: path.dirname(item.path),
        bannerComment: `/** ${item.path} **/`,
    });

    const exports = ts.split("export ");

    exports.forEach((v) => {
        const result = v.match(/^interface\s+\w+/g) || v.match(/^type\s+\w+/g);

        if (result) {
            const typeName = result[0];

            if (!typesHash[typeName] || v.indexOf("&") !== -1) {
                /**
                 * In some cases types may be defined with bugs: sometimes "properties" are ignored when the "allOf" is present in the schema.
                 * We assume that type that contains "&" in it's definition is 100% correct (allOf + properties) => replace previously defined type if exists
                 */
                console.log(`Add ${typeName}`);
                typesHash[typeName] = `export ${v}`;
            } else {
                // The type has been declared already
                console.log(`Found ${typeName}`);
            }
        } else {
            // expect bannerComment here
            typesHash[item.path] = v;
        }
    });
});

await fs.appendFile(typesPath, Object.values(typesHash).join("\n"));
