import Ajv, { ErrorObject } from "ajv";
import type { AnyObject, ValidationSchema } from "./types";
type ErrorResult = {
    [key: string]: string | ErrorResult;
};
export declare class JsonSchemaValidator {
    private readonly ajv;
    private readonly formatCodeMap;
    private readonly keywordsCodeMap;
    constructor();
    /**
     * Register host-specific AJV formats/keywords (e.g. web-app password/phone) on this instance.
     */
    registerExtensions(register: (ajvInstance: Ajv) => void): void;
    private getCompiledValidator;
    /**
     * Simplify AJV errors into LIVR-inspired field → code maps for API responses.
     * Inspired by https://github.com/koorchik/LIVR
     *
     * @example of raw AJV errors:
     * [
     *     {
     *         "instancePath": "",
     *         "schemaPath": "#/required",
     *         "keyword": "required",
     *         "params": {
     *             "missingProperty": "intent"
     *         },
     *         "message": "must have required property 'intent'"
     *     },
     *     {
     *         "instancePath": "/user",
     *         "schemaPath": "#/properties/user/required",
     *         "keyword": "required",
     *         "params": {
     *             "missingProperty": "username"
     *         },
     *         "message": "must have required property 'username'"
     *     },
     *     {
     *         "instancePath": "/user",
     *         "schemaPath": "#/properties/user/required",
     *         "keyword": "required",
     *         "params": {
     *             "missingProperty": "fullname"
     *         },
     *         "message": "must have required property 'fullname'"
     *     },
     *     {
     *         "instancePath": "/user/termsAccepted",
     *         "schemaPath": "#/properties/user/properties/termsAccepted/type",
     *         "keyword": "type",
     *         "params": {
     *             "type": "boolean"
     *         },
     *         "message": "must be boolean"
     *     },
     *     {
     *         "instancePath": "/user/termsAccepted",
     *         "schemaPath": "#/properties/user/properties/termsAccepted/enum",
     *         "keyword": "enum",
     *         "params": {
     *             "allowedValues": [
     *                 true
     *             ]
     *         },
     *         "message": "must be equal to one of the allowed values"
     *     },
     *     {
     *         "instancePath": "/user/password",
     *         "schemaPath": "#/properties/user/properties/password/equalToField",
     *         "keyword": "equalToField",
     *         "params": {},
     *         "message": "should be equal to the value of \"passwordConfirmation\""
     *     },
     *     {
     *         "instancePath": "/user/passwordConfirmation",
     *         "schemaPath": "#/properties/user/properties/passwordConfirmation/equalToField",
     *         "keyword": "equalToField",
     *         "params": {},
     *         "message": "should be equal to the value of \"password\""
     *     }
     * ]
     *
     * @example of the same errors after transformation:
     * {
     *     "intent": "REQUIRED",
     *     "user": {
     *         "username": "REQUIRED",
     *         "fullname": "REQUIRED",
     *         "termsAccepted": "FORMAT_ERROR",
     *         "password": "FIELDS_NOT_EQUAL",
     *         "passwordConfirmation": "FIELDS_NOT_EQUAL"
     *     }
     * }
     */
    transformErrors(errors?: ErrorObject[] | null): ErrorResult | undefined;
    /**
     * Validates and cleans data against the schema.
     * Drops empty-string and null properties first, then AJV removeAdditional.
     */
    validateAndClean(data: AnyObject, jsonSchema: ValidationSchema): {
        isValid: boolean | Promise<any>;
        errors: ErrorResult | undefined;
        rawErrors: ErrorObject<string, Record<string, any>, unknown>[] | null | undefined;
        validated: import("@mat3ra/esse/dist/js/utils/removeEmptyAndNullProperties").AnyObject;
    };
}
/** Shared singleton — hosts register app formats on this instance. */
export declare const jsonSchemaValidator: JsonSchemaValidator;
export {};
