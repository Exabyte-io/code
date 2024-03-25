"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNamedEntitySchema = exports.schemaByNamedEntityName = exports.getSchemaWithDependencies = exports.buildDependencies = exports.typeofSchema = exports.schemas = void 0;
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const forEach_1 = __importDefault(require("lodash/forEach"));
const has_1 = __importDefault(require("lodash/has"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
__exportStar(require("@mat3ra/esse/dist/js/esse/schemaUtils"), exports);
exports.schemas = {};
function typeofSchema(schema) {
    if (schema === null || schema === void 0 ? void 0 : schema.type) {
        return schema.type;
    }
    if ((0, has_1.default)(schema, "properties")) {
        return "object";
    }
    if ((0, has_1.default)(schema, "items")) {
        return "array";
    }
}
exports.typeofSchema = typeofSchema;
function extractEnumOptions(nodes) {
    if (!nodes || !nodes.length)
        return {};
    return {
        enum: nodes.map((node) => node.data.value),
        enumNames: nodes.map((node) => node.data.name),
    };
}
function substituteName(value, mapping) {
    if (typeof value !== "string") {
        return JSON.stringify(value);
    }
    return mapping ? mapping[value] : value;
}
function createStaticFields(node) {
    if (!node.staticOptions)
        return {};
    const fields = {};
    node.staticOptions
        .filter((o) => o.key && o.values)
        .forEach((o) => {
        fields[o.key] = {
            enum: o.values,
            enumNames: o.values.map((v) => substituteName(v, o.namesMap)),
        };
    });
    return fields;
}
/**
 * @summary Recursively generate `dependencies` for RJSF schema based on tree.
 * @param {Object[]} nodes - Array of nodes (e.g. `[tree]` or `node.children`)
 * @returns {{}|{dependencies: {}}}
 */
function buildDependencies(nodes) {
    const isEveryTerminal = nodes && nodes.every((node) => { var _a; return !((_a = node.children) === null || _a === void 0 ? void 0 : _a.length); });
    const isWithStaticOptions = nodes && nodes.some((node) => node === null || node === void 0 ? void 0 : node.staticOptions);
    if (!nodes || !nodes.length || !nodes[0].data)
        return {};
    const parentKey = nodes[0].data.key;
    const cases = nodes.map((node) => {
        var _a;
        const childKey = ((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) && node.children[0].data.key;
        return {
            properties: {
                [parentKey]: extractEnumOptions([node]),
                ...(childKey ? { [childKey]: extractEnumOptions(node.children) } : {}),
                ...createStaticFields(node),
            },
            ...buildDependencies(node.children),
        };
    });
    return cases.length && (!isEveryTerminal || isWithStaticOptions)
        ? {
            dependencies: {
                [parentKey]: {
                    oneOf: cases,
                },
            },
        }
        : {};
}
exports.buildDependencies = buildDependencies;
/**
 * Combine schema and dependencies block for usage with react-jsonschema-form (RJSF)
 */
function getSchemaWithDependencies({ schema = {}, nodes, modifyProperties = false, }) {
    if (!(0, isEmpty_1.default)(schema) && typeofSchema(schema) !== "object") {
        console.error("getSchemaWithDependencies() only accepts schemas of type 'object'");
        return {};
    }
    // RJSF does not automatically render dropdown widget if `enum` is not present
    if (modifyProperties && nodes.length) {
        const mod = {
            [nodes[0].data.key]: {
                ...extractEnumOptions(nodes),
            },
        };
        (0, forEach_1.default)(mod, (extraFields, key) => {
            if (schema.properties && (0, has_1.default)(schema, `properties.${key}`)) {
                schema.properties[key] = {
                    ...schema.properties[key],
                    ...extraFields,
                };
            }
        });
    }
    return {
        ...schema,
        ...buildDependencies(nodes),
    };
}
exports.getSchemaWithDependencies = getSchemaWithDependencies;
const DEFAULT_GENERATIVE_KEYS = ["name"];
const baseSchema = (definitionName, enforceUnique = true) => {
    return {
        type: "array",
        items: {
            $ref: `#/definitions/${definitionName}`,
        },
        uniqueItems: enforceUnique,
    };
};
const defaultNamedEntitySchema = (name) => {
    return {
        properties: {
            name: {
                type: "string",
                enum: [name],
            },
        },
    };
};
/**
 * Retrieves an RJSF schema with an id matching the provided name
 */
const schemaByNamedEntityName = (name) => {
    const translatedName = name.replace(/_/g, "-");
    const schema = JSONSchemasInterface_1.default.matchSchema({
        $id: {
            $regex: `${translatedName}$`,
        },
    });
    return schema;
};
exports.schemaByNamedEntityName = schemaByNamedEntityName;
/*
 * Filters an RJSF schema for all the properties used to generate a new schema
 */
const filterForGenerativeProperties = (schema) => {
    if (!schema.properties || typeof schema.properties !== "object")
        return {};
    const generativeFilter = ([propertyKey, property]) => {
        return ((typeof property === "object" && // JSONSchema7Definition type allows for boolean
            (property === null || property === void 0 ? void 0 : property.$comment) &&
            property.$comment.includes("isGenerative:true")) ||
            DEFAULT_GENERATIVE_KEYS.includes(propertyKey));
    };
    // @ts-ignore : JSONSchema6 and JSONSchema7 are incompatible
    const generativeProperties = Object.entries(schema.properties).filter(generativeFilter);
    const properties = Object.fromEntries(generativeProperties);
    return { properties, required: Object.keys(properties) }; // all included fields are required based on isGenerative flag
};
/*
 * Filters an RJSF schema for all the properties used to generate a new schema
 */
const buildNamedEntitiesDependencies = (entities) => {
    return {
        dependencies: {
            name: {
                oneOf: entities.map((entity) => {
                    const schema = (0, exports.schemaByNamedEntityName)(entity.name) ||
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
const buildNamedEntitiesDefinitions = (entities, defaultEntity, entityType) => {
    if (!Array.isArray(entities) || entities.length < 1)
        return {};
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
const buildNamedEntitySchema = (entities, defaultEntity, entityType, enforceUnique = true) => {
    return {
        ...buildNamedEntitiesDefinitions(entities, defaultEntity, entityType),
        ...baseSchema(entityType, enforceUnique),
    };
};
exports.buildNamedEntitySchema = buildNamedEntitySchema;
