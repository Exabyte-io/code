import { schemas } from "@exabyte-io/esse.js/schemas";
import mergeAllOf from "json-schema-merge-allof";

const schemasCache = new Map();
export class JSONSchemasInterface {
    /**
     *
     * @param {string} schemaId id of JSON schema from ESSE
     * @returns {Object.<string, any>} resolved JSON schema
     */
    static schemaById(schemaId) {
        if (!schemasCache.has(schemaId)) {
            const originalSchema = schemas.find((schema) => schema.schemaId === schemaId);

            const schema = mergeAllOf(originalSchema, {
                resolvers: {
                    defaultResolver: mergeAllOf.options.resolvers.title,
                },
            });

            schemasCache.set(schemaId, schema);
        }

        return schemasCache.get(schemaId);
    }

    /**
     *
     * @param {Object} - external schema
     */
    static registerSchema(schema) {
        schemasCache.set(schema.schemaId, schema);
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
}
