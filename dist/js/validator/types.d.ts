import type { SchemaObject } from "ajv";
export type ValidationSchema = SchemaObject & {
    $id: string;
};
export type AnyObject = Record<string, any>;
