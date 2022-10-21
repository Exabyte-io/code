import { JSONSchemasInterface } from "../JSONSchemasInterface";

export const schemas = {};

/**
 * Returns previously registered schema for InMemoryEntity
 * @param {*} className
 * @returns
 */
export function getSchemaByClassName(className) {
    return schemas[className] ? JSONSchemasInterface.schemaById(schemas[className]) : null;
}

/**
 * Register additional Entity classes to be resolved with jsonSchema property
 * @param {String} className - class name derived from InMemoryEntity
 * @param {String} schemaId - class schemaId
 */
export function registerClassName(className, schemaId) {
    schemas[className] = schemaId;
}
