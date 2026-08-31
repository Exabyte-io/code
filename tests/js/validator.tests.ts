import { expect } from "chai";

import {
    JsonSchemaValidator,
    jsonSchemaValidator,
} from "../../src/js/validator/JsonSchemaValidator";

const cleanSchema = {
    $id: "test/code-validator-clean",
    type: "object",
    properties: {
        name: { type: "string" },
        slug: { type: "string" },
        description: { type: "string" },
    },
    required: ["name"],
    additionalProperties: false,
};

describe("JsonSchemaValidator.transformErrors", () => {
    it("maps AJV required and format errors to LIVR-style codes", () => {
        const transformed = jsonSchemaValidator.transformErrors([
            {
                instancePath: "",
                schemaPath: "#/required",
                keyword: "required",
                params: { missingProperty: "intent" },
                message: "must have required property 'intent'",
            },
            {
                instancePath: "/user/password",
                schemaPath: "#/properties/user/properties/password/format",
                keyword: "format",
                params: { format: "custom-password" },
                message: 'must match format "custom-password"',
            },
        ] as never);

        expect(transformed).to.deep.equal({
            intent: "REQUIRED",
            user: {
                password: "WRONG_PASSWORD",
            },
        });
    });

    it("maps additionalProperties errors to the offending key, not the parent object", () => {
        const transformed = jsonSchemaValidator.transformErrors([
            {
                instancePath: "/job",
                schemaPath: "#/properties/job/additionalProperties",
                keyword: "additionalProperties",
                params: { additionalProperty: "someExtraField" },
                message: "must NOT have additional properties",
            },
        ] as never);

        expect(transformed).to.deep.equal({
            job: {
                someExtraField: "UNKNOWN_PROPERTY",
            },
        });
    });
});

describe("JsonSchemaValidator.validateAndClean", () => {
    it("strips nulls, empty strings, and additional properties by default", () => {
        const data = {
            name: "Si",
            slug: null,
            description: "",
            owner: { _id: "x" },
        };

        const result = jsonSchemaValidator.validateAndClean(data, cleanSchema);

        expect(result.isValid).to.equal(true);
        expect(result.validated).to.deep.equal({ name: "Si" });
    });

    it("keeps empty strings when removeEmptyStrings is false", () => {
        const validator = new JsonSchemaValidator({
            removeNull: true,
            removeEmptyStrings: false,
        });
        const schema = {
            ...cleanSchema,
            $id: "test/code-validator-keep-empty",
        };

        const result = validator.validateAndClean(
            { name: "Si", slug: null, description: "" },
            schema,
        );

        expect(result.isValid).to.equal(true);
        expect(result.validated).to.deep.equal({ name: "Si", description: "" });
    });

    it("leaves null keys for AJV when removeNull is false", () => {
        // AJV coerceTypes may turn null → "" for string fields; the option only skips our pre-strip.
        const validator = new JsonSchemaValidator({
            removeNull: false,
            removeEmptyStrings: true,
        });
        const schema = {
            ...cleanSchema,
            $id: "test/code-validator-keep-null-keys",
        };

        const result = validator.validateAndClean({ name: "Si", slug: null }, schema);

        expect(Object.prototype.hasOwnProperty.call(result.validated, "slug")).to.equal(true);
    });
});
