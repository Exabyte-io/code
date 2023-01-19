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

/**
 * @summary Build dependency case (i.e. subschema) for RJSF dependency block.
 *
 * Note that this function assumes the subschema to be of type `"object"`.
 * @param {String} parentKey - Key of fixed property
 * @param {any} parentValue - Value of fixed property
 * @param {String} childKey - Key of variable property
 * @param {Array} childValues - Array of values of variable property
 * @param {Object} dependencies - dependencies block for variable property
 * @param {Object} extraFields - extra fields for each property
 * @returns {{properties: {}}}
 */
function buildDependencyCase({
    parentKey,
    parentValue,
    childKey,
    childValues,
    dependencies = {},
    extraFields = {},
}) {
    return {
        properties: {
            [parentKey]: {
                enum: [parentValue],
                ...(extraFields[parentKey] || {}),
            },
            [childKey]: {
                enum: childValues,
                ...(extraFields[childKey] || {}),
            },
        },
        ...dependencies,
    };
}

function getEnumValues(nodes) {
    if (!nodes.length) return {};
    return {
        enum: nodes.map((node) => lodash.get(node, node.dataSelector.value)),
    };
}

function getEnumNames(nodes) {
    if (!nodes.length) return {};
    return {
        enumNames: nodes.map((node) => lodash.get(node, node.dataSelector.name)),
    };
}

/**
 * @summary Recursively generate `dependencies` for RJSF schema based on tree.
 * @param {Object[]} nodes - Array of nodes (e.g. `[tree]` or `node.children`)
 * @returns {{}|{dependencies: {}}}
 */
export function buildDependencies(nodes) {
    if (nodes.length === 0 || nodes.every((n) => !n.children?.length)) return {};
    const parentKey = nodes[0].dataSelector.key;
    const childKey = nodes[0].children[0].dataSelector.key;
    return {
        dependencies: {
            [parentKey]: {
                oneOf: nodes.map((node) =>
                    buildDependencyCase({
                        parentKey,
                        parentValue: lodash.get(node, node.dataSelector.value),
                        childKey,
                        childValues: node.children.map((c) => lodash.get(c, c.dataSelector.value)),
                        dependencies: buildDependencies(node.children),
                        extraFields: {
                            [parentKey]: { enumNames: [lodash.get(node, node.dataSelector.name)] },
                            [childKey]: {
                                enumNames: node.children.map((c) =>
                                    lodash.get(c, c.dataSelector.name),
                                ),
                            },
                        },
                    }),
                ),
            },
        },
    };
}

export function getSchemaWithDependencies({
    schema = {},
    schemaId,
    nodes,
    modifyProperties = false,
}) {
    const mainSchema =
        lodash.isEmpty(schema) && schemaId ? JSONSchemasInterface.schemaById(schemaId) : schema;

    if (!lodash.isEmpty(mainSchema) && typeofSchema(mainSchema) !== "object") {
        console.error("getSchemaWithDependencies() only accepts schemas of type 'object'");
        return {};
    }
    if (modifyProperties && nodes.length) {
        const mod = {
            [nodes[0].dataSelector.key]: {
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
