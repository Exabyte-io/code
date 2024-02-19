// /**
//  * This types are originally from "@types/json-schema" npm package.
//  * The one difference compared to the original implementation is schemaId property to JSONSchema interface
//  */
// declare module "@mat3ra/esse/schema" {
//     export { JSONSchema6 as JSONSchema } from "json-schema";
// }

declare module "@mat3ra/esse/lib/js/scripts/utils" {
    export function walkDirSync(path: string, cb: (path: string) => void): void;
}
