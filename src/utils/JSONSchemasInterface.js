import mergeAllOf from "json-schema-merge-allof";
import {schemas} from '@exabyte-io/esse.js/lib/js/esse/schemas.js';

const schemaCache = new Map();

export function getSchemaById(schemaId) {
    if (!schemaCache.has(schemaId)) {
        const schema = mergeAllOf(JSONSchemasInterface.schemaById(schemaId), {
            resolvers: {
                defaultResolver: mergeAllOf.options.resolvers.title
            }
        });
    
        schemaCache.set(schemaId, schema);
    }
    
    return schemaCache.get(schemaId);
}


export const JSONSchemasInterface = {

    schemas: function () {
        return schemas;
    },

    schemaById(schemaId) {
        return schemas.find(schema => schema.schemaId === schemaId);
    },

    resolvedSchemaById(schemaId) {
        return mergeAllOf(this.schemaById(schemaId), {
            resolvers: {
                defaultResolver: mergeAllOf.options.resolvers.title
            }
        });
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
        return schemas.find(schema => {
            return searchFields.every(field => {
                const {$regex} = query[field];
                return new RegExp($regex).test(schema[field]);
            });
        });
    }
};
