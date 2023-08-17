declare module "json-schema-deref-sync" {
    import { JSONSchema6, JSONSchema6Definition } from "@exabyte-io/esse.js/schema";

    function deref(globalSchema: JSONSchema6): JSONSchema6;
    function deref(globalSchema: JSONSchema6Definition): JSONSchema6Definition;

    export default deref;
}

declare module "json-schema-merge-allof" {
    interface MergeAllOfOptions {
        resolvers: {
            defaultResolver: string;
        };
    }

    interface MergeAllOf {
        <T extends JSONSchema6Definition>(globalSchema: T, options: MergeAllOfOptions): T;
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
 * The one difference compared to the original implementation is schemaId property to JSONSchema6 interface
 */
declare module "@exabyte-io/esse.js/schema" {
    export { JSONSchema6, JSONSchema6Definition, JSONSchema6Type } from "json-schema";
}

declare module "@exabyte-io/esse.js/lib/js/esse/schemaUtils" {
    // TODO: add TS to esse.js

    export function mapObjectDeep(object: object, mapValue: () => unknown): object;

    export function makeFlatSchemaKey(schemaId: string): string;

    export function makeFlatSchemaRef(schemaId: string): string;

    export function buildSchemaDefinitions(originalSchemas: JSONSchema6): JSONSchema6;
}
