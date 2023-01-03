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

function buildCase({
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
                ...extraFields.get(parentKey, {}),
            },
            [childKey]: {
                enum: childValues,
                ...extraFields.get(childKey, {}),
            },
        },
        ...dependencies,
    };
}

export function buildDependencies(parent, children) {
    if (children.length === 0 || children.every((n) => !n.children?.length)) return {};
    const parentKey = parent.data.selector;
    const childKey = children[0].data.selector;
    return {
        dependencies: {
            [parentKey]: {
                oneOf: children.map((node) =>
                    buildCase({
                        parentKey,
                        parentValue: parent.data[parentKey],
                        childKey,
                        childValues: node.options,
                        dependencies: buildDependencies(node, node.children),
                    }),
                ),
            },
        },
    };
}
