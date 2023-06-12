import lodash from "lodash";

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

export function typeofSchema(schema) {
    if (lodash.has(schema, "type")) {
        return schema.type;
    }
    if (lodash.has(schema, "properties")) {
        return "object";
    }
    if (lodash.has(schema, "items")) {
        return "array";
    }
}

function getEnumValues(nodes) {
    if (!nodes.length) return {};
    return {
        enum: nodes.map((node) => node.data.value),
    };
}

function getEnumNames(nodes) {
    if (!nodes.length) return {};
    return {
        enumNames: nodes.map((node) => node.data.name),
    };
}

/**
 * @summary Recursively generate `dependencies` for RJSF schema based on tree.
 * @param {Object[]} nodes - Array of nodes (e.g. `[tree]` or `node.children`)
 * @returns {{}|{dependencies: {}}}
 */
export function buildDependencies(nodes) {
    const isTerminal = nodes.every((n) => !n.children?.length);
    if (nodes.length === 0 || isTerminal || !nodes[0].data) return {};
    const parentKey = nodes[0].data.key;
    const childKey = nodes[0].children[0].data.key;
    return {
        dependencies: {
            [parentKey]: {
                oneOf: nodes.map((node) => {
                    return {
                        properties: {
                            [parentKey]: {
                                ...getEnumValues([node]),
                                ...getEnumNames([node]),
                            },
                            [childKey]: {
                                ...getEnumValues(node.children),
                                ...getEnumNames(node.children),
                            },
                        },
                        ...buildDependencies(node.children),
                    };
                }),
            },
        },
    };
}

/**
 * Combine schema and dependencies block for usage with react-jsonschema-form (RJSF)
 * @param {Object} schema - Schema
 * @param {String} schemaId - Schema id (takes precedence over `schema` when both are provided)
 * @param {Object[]} nodes - Array of nodes
 * @param {Boolean} modifyProperties - Whether properties in main schema should be modified (add `enum` and `enumNames`)
 * @returns {{}|{[p: string]: *}} - RJSF schema
 */
export function getSchemaWithDependencies({
    schema = {},
    schemaId,
    nodes,
    modifyProperties = false,
}) {
    const mainSchema = schemaId ? JSONSchemasInterface.schemaById(schemaId) : schema;

    if (!lodash.isEmpty(mainSchema) && typeofSchema(mainSchema) !== "object") {
        console.error("getSchemaWithDependencies() only accepts schemas of type 'object'");
        return {};
    }

    // RJSF does not automatically render dropdown widget if `enum` is not present
    if (modifyProperties && nodes.length) {
        const mod = {
            [nodes[0].data.key]: {
                ...getEnumNames(nodes),
                ...getEnumValues(nodes),
            },
        };
        lodash.forEach(mod, (extraFields, key) => {
            if (lodash.has(mainSchema, `properties.${key}`)) {
                mainSchema.properties[key] = { ...mainSchema.properties[key], ...extraFields };
            }
        });
    }

    return {
        ...(schemaId ? mainSchema : schema),
        ...buildDependencies(nodes),
    };
}
