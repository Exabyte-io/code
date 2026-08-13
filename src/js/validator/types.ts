import type { SchemaObject } from "ajv";

export type ValidationSchema = SchemaObject & { $id: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;
