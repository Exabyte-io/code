import baseSchema, {
    JSONSchema,
    JSONSchemaDefinition,
    JSONSchemaType,
} from "@exabyte-io/esse.js/schema";
import Ajv, { Options } from "ajv";
import deref from "json-schema-deref-sync";
import mergeAllOf from "json-schema-merge-allof";

type Query = { [key in keyof JSONSchema]: { $regex: string } };

type SchemaType = JSONSchemaDefinition | JSONSchemaDefinition[] | JSONSchemaType;

export const esseSchema = baseSchema;

const schemasCache = new Map<string, JSONSchema>();

function isEsseSchema(schema: SchemaType): schema is JSONSchema {
    return Boolean((schema as JSONSchema)?.$id);
}

/**
 * We assume that each schema in the application has its own unique schemaId
 * Unfortunately, mergeAllOf keeps schemaId after merging, and this results in multiple different schemas with the same schemaId
 * Hence this function
 */
function removeSchemaIdsAfterAllOf<T extends JSONSchemaDefinition>(schema: T, clean?: boolean): T;
function removeSchemaIdsAfterAllOf<T extends JSONSchemaDefinition>(
    schema: T[],
    clean?: boolean,
): T[];
function removeSchemaIdsAfterAllOf<T extends JSONSchemaType>(schema: T, clean?: boolean): T;

function removeSchemaIdsAfterAllOf(schema: SchemaType, clean = false) {
    if (clean && isEsseSchema(schema)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { $id, ...restSchema } = schema;

        return restSchema;
    }

    if (Array.isArray(schema)) {
        return (schema as JSONSchemaType[]).map((item) => removeSchemaIdsAfterAllOf(item));
    }

    if (typeof schema !== "object" || schema === null) {
        return schema;
    }

    if (schema.allOf) {
        const { allOf, ...restSchema } = schema;

        return {
            allOf: (allOf as JSONSchemaDefinition[]).map((innerSchema) =>
                removeSchemaIdsAfterAllOf(innerSchema, true),
            ),
            ...restSchema,
        };
    }

    return Object.fromEntries(
        Object.entries(schema).map(([key, value]) => {
            return [key, removeSchemaIdsAfterAllOf(value)];
        }),
    );
}

export class JSONSchemasInterface {
    static _schema: JSONSchema | null = null;

    static schemaById(schemaId: string) {
        if (schemasCache.size === 0) {
            JSONSchemasInterface.registerGlobalSchema(esseSchema);
        }

        return schemasCache.get(schemaId);
    }

    /**
     *
     * @param globalSchema
     */
    static registerGlobalSchema(globalSchema: JSONSchema) {
        if (JSONSchemasInterface._schema === globalSchema) {
            // performance optimization:
            // skip resolving as we already did it for the same globalSchema object
            return;
        }

        JSONSchemasInterface._schema = globalSchema;

        const { definitions } = deref(globalSchema);

        schemasCache.clear();

        if (!definitions) {
            return;
        }

        Object.values(definitions)
            .filter(isEsseSchema)
            .forEach((originalSchema) => {
                const schema = mergeAllOf(removeSchemaIdsAfterAllOf(originalSchema, false), {
                    resolvers: {
                        defaultResolver: mergeAllOf.options.resolvers.title,
                    },
                });

                if (schema.$id) {
                    schemasCache.set(schema.$id, schema);
                }
            });
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

    /**
     * Create validation function for schema with schemaId
     */
    static resolveJsonValidator(schemaId: string, options: Options = {}) {
        // @ts-ignore TODO: update Ajv validator
        const ajv = new Ajv(options);
        const schema = this.schemaById(schemaId);
        if (!schema) {
            return;
        }
        return ajv.compile(schema);
    }
}
