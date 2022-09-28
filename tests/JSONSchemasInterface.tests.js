import { expect } from "chai";

import { JSONSchemasInterface } from "../src/JSONSchemasInterface";

describe("JSONSchemasInterface", () => {
    it("can find schema", () => {
        const schema = JSONSchemasInterface.schemaById("workflow");
        expect(schema).to.be.an("object");
    });

    it("can match schemas", () => {
        const schema = JSONSchemasInterface.matchSchema({
            schemaId: {
                $regex: "workflow",
            },
        });

        expect(schema).to.be.an("object");
    });

    it("can find registered schemas", () => {
        JSONSchemasInterface.registerSchema({
            schemaId: "test-schema-id",
            properties: {
                testProp: {
                    type: "string",
                },
            },
        });

        const schema = JSONSchemasInterface.schemaById("test-schema-id");
        expect(schema).to.be.an("object");
    });
});
