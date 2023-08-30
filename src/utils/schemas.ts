import { JSONSchema } from "@exabyte-io/esse.js/schema";
import forEach from "lodash/forEach";
import getValue from "lodash/get";
import hasProperty from "lodash/has";
import isEmpty from "lodash/isEmpty";

import { JSONSchema7Definition } from "json-schema";

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

const DEFAULT_GENERATIVE_KEYS = ["name"];

interface NamedEntity {
    name: string;
}

const baseSchema = (definitionName: string, enforceUnique = true): JSONSchema => {
    return {
        type: "array",
        items: {
            $ref: `#/definitions/${definitionName}`,
        },
        uniqueItems: enforceUnique,
    };
};

const defaultNamedEntitySchema = (name: string) => {
    return {
        properties: {
            name: {
                type: "string",
                enum: [name],
            },
        },
    } as JSONSchema;
};

/**
 * Retrieves an RJSF schema with an id matching the provided name
 */
export const schemaByNamedEntityName = (name: string): JSONSchema | undefined => {
    const translatedName = name.replace(/_/g, "-");
    const schema = JSONSchemasInterface.matchSchema({
        $id: {
            $regex: `${translatedName}$`,
        },
    });
    return schema;
};

/*
 * Filters an RJSF schema for all the properties used to generate a new schema
 */
const filterForGenerativeProperties = (schema: JSONSchema) => {
    if (!schema.properties || typeof schema.properties !== "object") return {};
    const generativeFilter = ([propertyKey, property]: [string, JSONSchema7Definition]) => {
        return (
            (typeof property === "object" && // JSONSchema7Definition type allows for boolean
                property?.$comment &&
                property.$comment.includes("isGenerative:true")) ||
            DEFAULT_GENERATIVE_KEYS.includes(propertyKey)
        );
    };
    // @ts-ignore : JSONSchema6 and JSONSchema7 are incompatible
    const generativeProperties = Object.entries(schema.properties).filter(generativeFilter);
    const properties = Object.fromEntries(generativeProperties);
    return { properties, required: Object.keys(properties) } as JSONSchema; // all included fields are required based on isGenerative flag
};

/*
 * Filters an RJSF schema for all the properties used to generate a new schema
 */
const buildNamedEntitiesDependencies = (entities: NamedEntity[]) => {
    return {
        dependencies: {
            name: {
                oneOf: entities.map((entity) => {
                    const schema =
                        schemaByNamedEntityName(entity.name) ||
                        defaultNamedEntitySchema(entity.name);
                    return {

                        ...filterForGenerativeProperties(schema),
                    };
                }),
            },
        },
    };
};

/**
 * Generates an RJSF definition with a list of subschemas as enumerated options
 */
const buildNamedEntitiesDefinitions = (
    entities: NamedEntity[],
    defaultEntity: NamedEntity,
    entityType: string,
) => {
    if (!Array.isArray(entities) || entities.length < 1) return {};
    return {
        definitions: {
            [entityType]: {
                properties: {
                    name: {
                        type: "string",
                        enum: entities.map((entity) => entity.name),
                        default: defaultEntity.name || entities[0].name,
                    },
                },
                ...buildNamedEntitiesDependencies(entities),
            },
        },
    };
};

/*
 * Generates an RJSF scheme with a list of subschemas as enumerated options
 */
export const buildNamedEntitySchema = (
    entities: NamedEntity[],
    defaultEntity: NamedEntity,
    entityType: string,
    enforceUnique = true,
): JSONSchema => {
    return {
        ...buildNamedEntitiesDefinitions(entities, defaultEntity, entityType),
        ...baseSchema(entityType, enforceUnique),
    } as JSONSchema;
};
