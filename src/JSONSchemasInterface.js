import { schemas } from "@exabyte-io/esse.js/schemas";
import Ajv from "ajv";
import mergeAllOf from "json-schema-merge-allof";

const schemasCache = new Map();

/**
 * We assume that each schema in the application has its own unique schemaId
 * Unfortunately, mergeAllOf keeps schemaId after merging, and this results in multiple different schemas with the same schemaId
 * Hence this function
 */
function removeSchemaIdsAfterAllOf(schema, clean = false) {
    if (clean) {
        const { schemaId, ...restSchema } = schema;

        return restSchema;
    }

    if (Array.isArray(schema)) {
        return schema.map((item) => removeSchemaIdsAfterAllOf(item));
    }

    if (typeof schema !== "object") {
        return schema;
    }

    if (schema.allOf) {
        const { allOf, ...restSchema } = schema;

        return {
            allOf: allOf.map((innerSchema) => removeSchemaIdsAfterAllOf(innerSchema, true)),
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
    /**
     *
     * @param {string} schemaId id of JSON schema from ESSE
     * @returns {Object.<string, any>} resolved JSON schema
     */
    static schemaById(schemaId) {
        if (!schemasCache.has(schemaId)) {
            const originalSchema = schemas.find((schema) => schema.schemaId === schemaId);

            if (!originalSchema) {
                throw new Error(`Schema not found: ${schemaId}`);
            }

            this.registerSchema(originalSchema);
        }

        return schemasCache.get(schemaId);
    }

    /**
     *
     * @param {Object} - external schema
     */
    static registerSchema(originalSchema) {
        const schema = mergeAllOf(removeSchemaIdsAfterAllOf(originalSchema), {
            resolvers: {
                defaultResolver: mergeAllOf.options.resolvers.title,
            },
        });

        schemasCache.set(schema.schemaId, schema);

        return schema;
    }

    /**
     * @example <caption>Search by schemaId regex</caption>
     * JSONSchemasInterface.matchSchema({
     *   schemaId: {
     *     $regex: 'software-application'
     *   }
     * })
     *
     * @example <caption>Search by schemaId and title regex</caption>
     * JSONSchemasInterface.matchSchema({
     *   schemaId: {
     *     $regex: 'software-application'
     *   },
     *   title: {
     *     $regex: 'application'
     *   }
     * })
     *
     * @param  {Object} query - An object containing mongo-like search query
     * @returns {Object|null} JSON schema
     */
    static matchSchema(query) {
        const searchFields = Object.keys(query);
        return schemas.find((schema) => {
            return searchFields.every((field) => {
                const { $regex } = query[field];
                return new RegExp($regex).test(schema[field]);
            });
        });
    }

    /**
     * Create validation function for schema with schemaId
     * @param {string} schemaId - id of JSON schema from ESSE
     * @param {Object} options - Options to pass through to Ajv object
     * @return {ValidateFunction<unknown>}
     */
    static resolveJsonValidator(schemaId, options = {}) {
        const ajv = new Ajv(options);
        return ajv.compile(this.schemaById(schemaId));
    }
}
