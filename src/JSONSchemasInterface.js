import { schemas } from "@exabyte-io/esse.js/schemas";
import mergeAllOf from "json-schema-merge-allof";

const schemaCache = new Map();

export const JSONSchemasInterface = {
    schemas() {
        return schemas;
    },

    schemaById(schemaId) {
        if (!schemaCache.has(schemaId)) {
            const originalSchema = schemas.find((schema) => schema.schemaId === schemaId);

            const schema = mergeAllOf(originalSchema, {
                resolvers: {
                    defaultResolver: mergeAllOf.options.resolvers.title,
                },
            });

            schemaCache.set(schemaId, schema);
        }

        return schemaCache.get(schemaId);
    },

    resolvedSchemaById(schemaId) {
        return this.schemaById(schemaId);
    },

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
    matchSchema(query) {
        const searchFields = Object.keys(query);
        return schemas.find((schema) => {
            return searchFields.every((field) => {
                const { $regex } = query[field];
                return new RegExp($regex).test(schema[field]);
            });
        });
    },
};
