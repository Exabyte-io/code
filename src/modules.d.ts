declare module "json-schema-deref-sync" {
    import { JSONSchema, JSONSchemaDefinition } from "@exabyte-io/esse.js/schema";

    function deref(globalSchema: JSONSchema): JSONSchema;
    function deref(globalSchema: JSONSchemaDefinition): JSONSchemaDefinition;

    export default deref;
}

declare module "json-schema-merge-allof" {
    interface MergeAllOfOptions {
        resolvers: {
            defaultResolver: string;
        };
    }

    interface MergeAllOf {
        <T extends JSONSchemaDefinition>(globalSchema: T, options: MergeAllOfOptions): T;
        options: {
            resolvers: {
                title: string;
            };
        };
    }

    const mergeAllOf: MergeAllOf;

    export default mergeAllOf;
}

/**
 * This types are originally from "@types/json-schema" npm package.
 * The one difference compared to the original implementation is schemaId property to JSONSchema interface
 */
declare module "@exabyte-io/esse.js/schema" {
    export {
        JSONSchema6 as JSONSchema,
        JSONSchema6Definition as JSONSchemaDefinition,
        JSONSchema6Type as JSONSchemaType,
    } from "json-schema";
}

declare module "@exabyte-io/esse.js/lib/js/esse/schemaUtils" {
    // TODO: add TS to esse.js

    export function mapObjectDeep(object: object, mapValue: () => unknown): object;

    export function makeFlatSchemaKey(schemaId: string): string;

    export function makeFlatSchemaRef(schemaId: string): string;

    export function buildSchemaDefinitions(originalSchemas: JSONSchema): JSONSchema;
}
