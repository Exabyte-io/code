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
        enum: nodes.map((node) => lodash.get(node, node.dataSelector.value)),
    };
}

function getEnumNames(nodes) {
    if (!nodes.length) return {};
    return {
        enumNames: nodes.map((node) => lodash.get(node, node.dataSelector.name)),
    };
}

function getOneOfValues(nodes) {
    if (!nodes.length) return {};
    return {
        oneOf: nodes.map((node) => {
            return {
                title: lodash.get(node, node.dataSelector.name),
                enum: [lodash.get(node, node.dataSelector.value)],
            };
        }),
    };
}

/**
 * @summary Recursively generate `dependencies` for RJSF schema based on tree.
 * @param {Object[]} nodes - Array of nodes (e.g. `[tree]` or `node.children`)
 * @returns {{}|{dependencies: {}}}
 */
export function buildDependenciesEnum(nodes) {
    if (nodes.length === 0 || nodes.every((n) => !n.children?.length)) return {};
    const parentKey = nodes[0].dataSelector.key;
    const childKey = nodes[0].children[0].dataSelector.key;
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
                        ...buildDependenciesEnum(node.children),
                    };
                }),
            },
        },
    };
}

/**
 * @summary Recursively generate `dependencies` for RJSF schema based on tree.
 * @param {Object[]} nodes - Array of nodes (e.g. `[tree]` or `node.children`)
 * @returns {{}|{dependencies: {}}}
 */
export function buildDependenciesOneOf(nodes) {
    if (nodes.length === 0 || nodes.every((n) => !n.children?.length)) return {};
    const parentKey = nodes[0].dataSelector.key;
    const childKey = nodes[0].children[0].dataSelector.key;
    return {
        dependencies: {
            [parentKey]: {
                oneOf: nodes.map((node) => {
                    return {
                        properties: {
                            [parentKey]: {
                                title: lodash.get(node, node.dataSelector.name),
                                enum: [lodash.get(node, node.dataSelector.value)],
                            },
                            [childKey]: {
                                ...getOneOfValues(node.children),
                            },
                        },
                        ...buildDependenciesOneOf(node.children),
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
 * @param {Boolean} useEnum - whether to use `enum` or `oneOf` to render dropdown menus
 * @returns {{}|{[p: string]: *}} - RJSF schema
 */
export function getSchemaWithDependencies({
    schema = {},
    schemaId,
    nodes,
    modifyProperties = false,
    useEnum = false,
}) {
    const mainSchema = schemaId ? JSONSchemasInterface.schemaById(schemaId) : schema;

    if (!lodash.isEmpty(mainSchema) && typeofSchema(mainSchema) !== "object") {
        console.error("getSchemaWithDependencies() only accepts schemas of type 'object'");
        return {};
    }

    // RJSF does not automatically render dropdown widget if `enum` is not present
    if (modifyProperties && nodes.length) {
        const modifiedSchema = lodash.cloneDeep(mainSchema);
        const mod = {
            [nodes[0].dataSelector.key]: {
                ...(useEnum
                    ? { ...getEnumNames(nodes), ...getEnumValues(nodes) }
                    : getOneOfValues(nodes)),
            },
        };
        lodash.forEach(mod, (extraFields, key) => {
            if (lodash.has(modifiedSchema, `properties.${key}`)) {
                modifiedSchema.properties[key] = {
                    ...modifiedSchema.properties[key],
                    ...extraFields,
                };
            }
        });
        return {
            ...modifiedSchema,
            ...(useEnum ? buildDependenciesEnum(nodes) : buildDependenciesOneOf(nodes)),
        };
    }

    return {
        ...mainSchema,
        ...(useEnum ? buildDependenciesEnum(nodes) : buildDependenciesOneOf(nodes)),
    };
}
