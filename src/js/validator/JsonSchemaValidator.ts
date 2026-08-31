/**
 * Standalone AJV validator for cleaning and validating JSON against JSON Schema.
 *
 * Why this exists (alongside esse `utils/ajv`):
 * - Compose schemas with `mergeAllOf` and enforce allowlists via `additionalProperties: false`
 *   so callers can reject unknown / system-owned fields.
 * - Optionally strip null / empty-string properties before type checks (see constructor options).
 * - Map raw AJV errors into stable nested field → code objects (LIVR-style) for consumers that
 *   need machine-readable validation results.
 *
 * Distinct from `@mat3ra/esse` `utils/ajv.validateAndClean` (entity clean: null-only strip used by
 * `InMemoryEntity.toJSON*`). Prefer this class/API for application validation; register host
 * formats with {@link JsonSchemaValidator.registerExtensions}.
 */
import { removeEmptyAndNullProperties } from "@mat3ra/esse/dist/js/utils/removeEmptyAndNullProperties";
import Ajv, { ErrorObject } from "ajv";
import { AnyValidateFunction } from "ajv/dist/core";
import addFormats from "ajv-formats";
import addKeywords from "ajv-keywords";
import pointer from "json-pointer";
import mergeAllOf from "json-schema-merge-allof";

import addSharedFormatsAndKeywords from "./rules";
import type { AnyObject, ValidationSchema } from "./types";

type ErrorResult = {
    [key: string]: string | ErrorResult;
};

export type JsonSchemaValidatorOptions = {
    /**
     * Delete object properties whose value is `null` before AJV (default: `true`).
     * Nested objects are walked; array elements are not removed.
     */
    removeNull?: boolean;
    /**
     * Delete object properties whose value is `""` before AJV (default: `true`).
     * Keep `false` when empty strings are intentional placeholders (e.g. flowchart links).
     */
    removeEmptyStrings?: boolean;
};

/**
 * Recursively deletes empty-string object properties (mutates in place).
 */
function removeEmptyStringProperties(obj: AnyObject): AnyObject {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        obj.forEach((item) => removeEmptyStringProperties(item));
        return obj;
    }

    Object.keys(obj).forEach((key) => {
        const value = obj[key];

        if (value === "") {
            delete obj[key];
        } else if (typeof value === "object") {
            removeEmptyStringProperties(value);
        }
    });

    return obj;
}

export class JsonSchemaValidator {
    private readonly ajv: Ajv;

    private readonly removeNull: boolean;

    private readonly removeEmptyStrings: boolean;

    private readonly formatCodeMap: Record<string, string> = {
        email: "WRONG_EMAIL",
        "custom-email": "WRONG_EMAIL",
        "custom-username": "WRONG_USERNAME",
        "custom-phone": "WRONG_PHONE",
        "custom-password": "WRONG_PASSWORD",
    };

    private readonly keywordsCodeMap: Record<string, string> = {
        required: "REQUIRED",
        type: "FORMAT_ERROR",
        equalToField: "FIELDS_NOT_EQUAL",
        minLength: "TOO_SHORT",
        maxLength: "TOO_LONG",
        isoDate: "WRONG_DATE",
        additionalProperties: "UNKNOWN_PROPERTY",
    };

    constructor({ removeNull = true, removeEmptyStrings = true }: JsonSchemaValidatorOptions = {}) {
        this.removeNull = removeNull;
        this.removeEmptyStrings = removeEmptyStrings;

        this.ajv = new Ajv({
            allErrors: true,
            useDefaults: true,
            discriminator: true,
            removeAdditional: true,
            coerceTypes: true,
            allowUnionTypes: true,
            // Esse / workflow schemas: json-schema-to-typescript-only keywords, and `default` inside
            // discriminated `oneOf` branches where Ajv still treats nested rules as composite (see
            // assignDefault + compositeRule). strictSchema would fail compilation for those valid schemas.
            strictSchema: false,
        });

        addFormats(this.ajv);
        addKeywords(this.ajv);
        addSharedFormatsAndKeywords(this.ajv);
    }

    /**
     * Register host-specific AJV formats/keywords (e.g. web-app password/phone) on this instance.
     */
    registerExtensions(register: (ajvInstance: Ajv) => void): void {
        register(this.ajv);
    }

    private getCompiledValidator(jsonSchema: ValidationSchema): AnyValidateFunction {
        let validate = this.ajv.getSchema(jsonSchema.$id);

        if (!validate) {
            const schema = mergeAllOf(jsonSchema, { ignoreAdditionalProperties: true });
            this.ajv.addSchema(schema, jsonSchema.$id);
            validate = this.ajv.getSchema(jsonSchema.$id);
        }

        if (!validate) {
            throw new Error("JSONSchemasInterface AJV validator error");
        }

        return validate;
    }

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
    transformErrors(errors?: ErrorObject[] | null): ErrorResult | undefined {
        if (!errors) {
            return undefined;
        }

        const result: ErrorResult = {};

        errors.forEach((error) => {
            const code =
                error.keyword === "format"
                    ? this.formatCodeMap[error.params.format] || "FORMAT_ERROR"
                    : this.keywordsCodeMap[error.keyword] || "FORMAT_ERROR";

            // AJV reports `additionalProperties` errors (like `required`'s `missingProperty`)
            // against the *parent* object's instancePath, with the offending key only in
            // `params` - without this, every rejected key on the same object collapses to one
            // flat code on the parent, hiding which key(s) were actually unknown.
            const offendingKey = error.params.missingProperty || error.params.additionalProperty;
            const instancePath = offendingKey
                ? `${error.instancePath}/${offendingKey}`
                : error.instancePath;

            pointer.set(result, instancePath, code);
        });

        /**
         * JSON.parse/JSON.stringify is required to fix <1 empty item> issue.
         * @example
         * pointer.set(result, "/nested/prop2/0", "ERROR_1");
         * pointer.set(result, "/nested/prop2/2", "ERROR_2");
         *
         * without JSON.parse/JSON.stringify:
         * result.prop2 === ["ERROR_1", <1 empty item>, "ERROR_2"]
         *
         * with JSON.parse/JSON.stringify:
         * result.prop2 === ["ERROR_1", null, "ERROR_2"]
         */
        return JSON.parse(JSON.stringify(result));
    }

    /**
     * Validates and cleans data against the schema.
     * Optionally drops null / empty-string properties (constructor options), then AJV removeAdditional.
     */
    validateAndClean(data: AnyObject, jsonSchema: ValidationSchema) {
        const validated = { ...data };

        if (this.removeNull) {
            removeEmptyAndNullProperties(validated);
        }

        if (this.removeEmptyStrings) {
            removeEmptyStringProperties(validated);
        }

        const compiledValidator = this.getCompiledValidator({
            ...jsonSchema,
            additionalProperties: false,
        });
        const isValid = compiledValidator(validated);

        return {
            isValid,
            errors: this.transformErrors(compiledValidator.errors || undefined),
            rawErrors: compiledValidator.errors,
            validated,
        };
    }
}

/** Shared singleton — hosts register app formats on this instance (null + "" strip on). */
export const jsonSchemaValidator = new JsonSchemaValidator();
