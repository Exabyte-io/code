import { walkDirSync } from "@mat3ra/esse/lib/js/scripts/utils";
import { JSONSchema } from "@mat3ra/esse/schema";
import Ajv, { Options, SchemaObject } from "ajv";
import fs from "fs";
import path from "path";

type Query = { [key in keyof JSONSchema]: { $regex: string } };

const schemasCache = new Map<string, JSONSchema>();

export function readSchemaFolderSync(folderPath: string) {
    const schemas: SchemaObject[] = [];

    walkDirSync(folderPath, (filePath: string) => {
        if (path.extname(filePath) !== ".json") {
            return;
        }
        const schema = JSON.parse(fs.readFileSync(filePath).toString());
        schemas.push(schema);
    });

    return schemas;
}

export class JSONSchemasInterface {
    static _schema: SchemaObject | null = null;

    static schemaFolder = path.resolve("node_modules/@mat3ra/esse/lib/js/schema");

    static setSchemaFolder(schemaFolder: string) {
        this.schemaFolder = schemaFolder;
        this.readSchemaFolder();
    }

    static readSchemaFolder() {
        const schemas = readSchemaFolderSync(this.schemaFolder);

        schemas.forEach((schema) => {
            if (schema.$id) {
                schemasCache.set(schema.$id, schema);
            }
        });
    }

    static schemaById(schemaId: string) {
        if (schemasCache.size === 0) {
            this.readSchemaFolder();
        }

        return schemasCache.get(schemaId);
    }

    /**
     * @example <caption>Search by $id regex</caption>
     * JSONSchemasInterface.matchSchema({
     *   $id: {
     *     $regex: 'software-application'
     *   }
     * })
     *
     * @example <caption>Search by $id and title regex</caption>
     * JSONSchemasInterface.matchSchema({
     *   $id: {
     *     $regex: 'software-application'
     *   },
     *   title: {
     *     $regex: 'application'
     *   }
     * })
     */
    static matchSchema(query: Query) {
        const searchFields = Object.keys(query) as Array<keyof typeof query>;

        return Array.from(schemasCache.values()).find((schema) => {
            return searchFields.every((field) => {
                const queryField = query[field];
                const schemaField = schema[field];

                if (!queryField || typeof schemaField !== "string") {
                    return;
                }

                return new RegExp(queryField.$regex).test(schemaField);
            });
        });
    }
}
