import { expect } from "chai";

import { jsonSchemaValidator } from "../../src/js/validator/JsonSchemaValidator";

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
});

describe("JsonSchemaValidator.validateAndClean", () => {
    it("strips nulls and additional properties", () => {
        const schema = {
            $id: "test/code-validator-clean",
            type: "object",
            properties: {
                name: { type: "string" },
                slug: { type: "string" },
            },
            required: ["name"],
            additionalProperties: false,
        };

        const data = {
            name: "Si",
            slug: null,
            owner: { _id: "x" },
        };

        const result = jsonSchemaValidator.validateAndClean(data, schema);

        expect(result.isValid).to.equal(true);
        expect(result.validated).to.deep.equal({ name: "Si" });
    });
});
