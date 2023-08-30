import { JSONSchema } from "@exabyte-io/esse.js/schema";
import forEach from "lodash/forEach";
import getValue from "lodash/get";
import hasProperty from "lodash/has";
import isEmpty from "lodash/isEmpty";

import { JSONSchemasInterface } from "../JSONSchemasInterface";

export * from "@exabyte-io/esse.js/lib/js/esse/schemaUtils";

export const schemas: { [key: string]: string } = {};

interface Node {
    dataSelector: {
        key: string;
        value: string;
        name: string;
    };
    children?: Node[];
}

function isNodeWithChildren(node: Node): node is Required<Node> {
    return Boolean(node.children?.length);
}

/**
 * Returns previously registered schema for InMemoryEntity
 * @returns
 */
export function getSchemaByClassName(className: string) {
    return schemas[className] ? JSONSchemasInterface.schemaById(schemas[className]) : null;
}

/**
 * Register additional Entity classes to be resolved with jsonSchema property
 * @param {String} className - class name derived from InMemoryEntity
 * @param {String} schemaId - class schemaId
 */
export function registerClassName(className: string, schemaId: string) {
    schemas[className] = schemaId;
}

export function typeofSchema(schema: JSONSchema) {
    if (schema?.type) {
        return schema.type;
    }
    if (hasProperty(schema, "properties")) {
        return "object";
    }
    if (hasProperty(schema, "items")) {
        return "array";
    }
}

function getEnumValues(nodes: Node[]) {
    if (!nodes.length) return {};
    return {
        enum: nodes.map((node) => getValue(node, node.dataSelector.value)),
    };
}

function getEnumNames(nodes: Node[]) {
    if (!nodes.length) return {};
    return {
        enumNames: nodes.map((node) => getValue(node, node.dataSelector.name)),
    };
}

/**
 * @summary Recursively generate `dependencies` for RJSF schema based on tree.
 * @param {Object[]} nodes - Array of nodes (e.g. `[tree]` or `node.children`)
 * @returns {{}|{dependencies: {}}}
 */
export function buildDependencies(nodes: Node[]): JSONSchema {
    if (nodes.length === 0 || nodes.every((n) => !n.children?.length)) return {};

    const nodesWithChildren = nodes.filter(isNodeWithChildren);
    const parentKey = nodesWithChildren[0].dataSelector.key;
    const childKey = nodesWithChildren[0].children[0].dataSelector.key;

    return {
        dependencies: {
            [parentKey]: {
                oneOf: nodesWithChildren.map((node) => {
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

interface Props {
    // Schema
    schema?: JSONSchema;
    // Schema id (takes precedence over `schema` when both are provided)
    schemaId: string;
    // Array of nodes
    nodes: Node[];
    // Whether properties in main schema should be modified (add `enum` and `enumNames`)
    modifyProperties?: boolean;
}

/**
 * Combine schema and dependencies block for usage with react-jsonschema-form (RJSF)
 */
export function getSchemaWithDependencies({
    schema = {},
    schemaId,
    nodes,
    modifyProperties = false,
}: Props): JSONSchema {
    const mainSchema = schemaId ? JSONSchemasInterface.schemaById(schemaId) || {} : schema;

    if (!isEmpty(mainSchema) && typeofSchema(mainSchema) !== "object") {
        console.error("getSchemaWithDependencies() only accepts schemas of type 'object'");
        return {};
    }

    // RJSF does not automatically render dropdown widget if `enum` is not present
    if (modifyProperties && nodes.length) {
        const mod = {
            [nodes[0].dataSelector.key]: {
                ...getEnumNames(nodes),
                ...getEnumValues(nodes),
            },
        };
        forEach(mod, (extraFields, key) => {
            if (mainSchema.properties && hasProperty(mainSchema, `properties.${key}`)) {
                mainSchema.properties[key] = {
                    ...(mainSchema.properties[key] as object),
                    ...extraFields,
                };
            }
        });
    }

    return {
        ...(schemaId ? mainSchema : schema),
        ...buildDependencies(nodes),
    };
}
