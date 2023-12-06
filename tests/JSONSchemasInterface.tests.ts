/* eslint-disable no-unused-expressions */
import { assert, expect } from "chai";

import { JSONSchemasInterface } from "../src/JSONSchemasInterface";
import { assertArray, assertObject } from "./utils";

describe("JSONSchemasInterface", () => {
    it("can match schemas", async () => {
        JSONSchemasInterface.registerGlobalSchema({
            $id: "global",
            definitions: {
                workflow: {
                    $id: "workflow",
                    $schema: "http://json-schema.org/draft-04/schema#",
                    title: "System in-set schema",
                    properties: {
                        prop: {
                            type: "string",
                        },
                    },
                },
            },
        });

        const schema = JSONSchemasInterface.matchSchema({
            $id: {
                $regex: "workflow",
            },
        });

        expect(schema).to.be.an("object");
    });

    it("can create a validation function for a schema by schema id", async () => {
        JSONSchemasInterface.registerGlobalSchema({
            $id: "global",
            definitions: {
                "test-person": {
                    $id: "test/person",
                    $schema: "http://json-schema.org/draft-04/schema#",
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        age: { type: "integer", minimum: 18 },
                    },
                    required: ["name", "age"],
                },
            },
        });
        const personValid = { name: "John Doe", age: 30 };
        const personInvalid = { name: "John Doe", age: 15 };
        const validate = JSONSchemasInterface.resolveJsonValidator("test/person", {
            allErrors: true,
            verbose: true,
        });

        if (validate) {
            expect(validate(personValid)).to.be.true;
            expect(validate(personInvalid)).to.be.false;
        }
    });
});
