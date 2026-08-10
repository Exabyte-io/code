"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonSchemaValidator = exports.JsonSchemaValidator = void 0;
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
const removeEmptyAndNullProperties_1 = require("@mat3ra/esse/dist/js/utils/removeEmptyAndNullProperties");
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv_keywords_1 = __importDefault(require("ajv-keywords"));
const json_pointer_1 = __importDefault(require("json-pointer"));
const json_schema_merge_allof_1 = __importDefault(require("json-schema-merge-allof"));
const rules_1 = __importDefault(require("./rules"));
/**
 * Recursively deletes empty-string object properties (mutates in place).
 */
function removeEmptyStringProperties(obj) {
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
        }
        else if (typeof value === "object") {
            removeEmptyStringProperties(value);
        }
    });
    return obj;
}
class JsonSchemaValidator {
    constructor({ removeNull = true, removeEmptyStrings = true } = {}) {
        this.formatCodeMap = {
            email: "WRONG_EMAIL",
            "custom-email": "WRONG_EMAIL",
            "custom-username": "WRONG_USERNAME",
            "custom-phone": "WRONG_PHONE",
            "custom-password": "WRONG_PASSWORD",
        };
        this.keywordsCodeMap = {
            required: "REQUIRED",
            type: "FORMAT_ERROR",
            equalToField: "FIELDS_NOT_EQUAL",
            minLength: "TOO_SHORT",
            maxLength: "TOO_LONG",
            isoDate: "WRONG_DATE",
        };
        this.removeNull = removeNull;
        this.removeEmptyStrings = removeEmptyStrings;
        this.ajv = new ajv_1.default({
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
        (0, ajv_formats_1.default)(this.ajv);
        (0, ajv_keywords_1.default)(this.ajv);
        (0, rules_1.default)(this.ajv);
    }
    /**
     * Register host-specific AJV formats/keywords (e.g. web-app password/phone) on this instance.
     */
    registerExtensions(register) {
        register(this.ajv);
    }
    getCompiledValidator(jsonSchema) {
        let validate = this.ajv.getSchema(jsonSchema.$id);
        if (!validate) {
            const schema = (0, json_schema_merge_allof_1.default)(jsonSchema, { ignoreAdditionalProperties: true });
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
    transformErrors(errors) {
        if (!errors) {
            return undefined;
        }
        const result = {};
        errors.forEach((error) => {
            const code = error.keyword === "format"
                ? this.formatCodeMap[error.params.format] || "FORMAT_ERROR"
                : this.keywordsCodeMap[error.keyword] || "FORMAT_ERROR";
            const instancePath = error.params.missingProperty
                ? `${error.instancePath}/${error.params.missingProperty}`
                : error.instancePath;
            json_pointer_1.default.set(result, instancePath, code);
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
    validateAndClean(data, jsonSchema) {
        const validated = { ...data };
        if (this.removeNull) {
            (0, removeEmptyAndNullProperties_1.removeEmptyAndNullProperties)(validated);
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
exports.JsonSchemaValidator = JsonSchemaValidator;
/** Shared singleton — hosts register app formats on this instance (null + "" strip on). */
exports.jsonSchemaValidator = new JsonSchemaValidator();
