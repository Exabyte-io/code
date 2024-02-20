import { JSONSchema7 } from "json-schema";
export * from "@mat3ra/esse/lib/js/esse/schemaUtils";
export declare const schemas: {
    [key: string]: string;
};
interface SubstitutionMap {
    [key: string]: string;
}
interface Parameter {
    key: string;
    values: string[] | boolean[];
    namesMap?: SubstitutionMap;
}
interface Node {
    data: {
        key: string;
        value: string;
        name: string;
    };
    staticOptions?: Parameter[];
    children?: Node[];
    [otherKey: string]: unknown;
}
export declare function typeofSchema(schema: JSONSchema7): import("json-schema").JSONSchema7TypeName | import("json-schema").JSONSchema7TypeName[];
/**
 * @summary Recursively generate `dependencies` for RJSF schema based on tree.
 * @param {Object[]} nodes - Array of nodes (e.g. `[tree]` or `node.children`)
 * @returns {{}|{dependencies: {}}}
 */
export declare function buildDependencies(nodes?: Node[]): JSONSchema7;
interface Props {
    schema?: JSONSchema7;
    nodes: Node[];
    modifyProperties?: boolean;
}
/**
 * Combine schema and dependencies block for usage with react-jsonschema-form (RJSF)
 */
export declare function getSchemaWithDependencies({ schema, nodes, modifyProperties, }: Props): JSONSchema7;
interface NamedEntity {
    name: string;
}
/**
 * Retrieves an RJSF schema with an id matching the provided name
 */
export declare const schemaByNamedEntityName: (name: string) => JSONSchema7 | undefined;
export declare const buildNamedEntitySchema: (entities: NamedEntity[], defaultEntity: NamedEntity, entityType: string, enforceUnique?: boolean) => JSONSchema7;
