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
                    $schema: "http://json-schema.org/draft-07/schema#",
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

    it("can find registered schemas; the schema is merged and clean", async () => {
        JSONSchemasInterface.registerGlobalSchema({
            $id: "global",
            definitions: {
                "in-memory-entity-base": {
                    $id: "in-memory-entity/base",
                    $schema: "http://json-schema.org/draft-07/schema#",
                    title: "System in-set schema",
                    properties: {
                        _id: {
                            type: "string",
                        },
                        type: {
                            type: "string",
                        },
                    },
                },
                "system-in-set": {
                    $id: "system/in-set",
                    $schema: "http://json-schema.org/draft-07/schema#",
                    title: "System in-set schema",
                    properties: {
                        inSet: {
                            type: "array",
                            items: {
                                allOf: [
                                    {
                                        $id: "system/entity-reference",
                                        $schema: "http://json-schema.org/draft-07/schema#",
                                        title: "entity reference schema",
                                        properties: {
                                            _id: {
                                                description: "entity identity",
                                                type: "string",
                                            },
                                            cls: {
                                                description: "entity class",
                                                type: "string",
                                            },
                                            slug: {
                                                description: "entity slug",
                                                type: "string",
                                            },
                                        },
                                    },
                                    {
                                        type: "object",
                                        properties: {
                                            type: {
                                                type: "string",
                                            },
                                            index: {
                                                type: "number",
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                        valueMapFunction: {
                            description:
                                "Specifies the function to convert the currentValue in UI.",
                            type: "string",
                            enum: [
                                "toString",
                                "toContactUs",
                                "toPlusMinusSign",
                                "toUnlimited",
                                "toSupportSeverity",
                            ],
                            default: "toString",
                        },
                    },
                },
            },
        });

        const schema = JSONSchemasInterface.schemaById("system/in-set");

        expect(schema).to.be.an("object");
        assert(schema?.$id, "system/in-set");
        expect(schema?.properties?.inSet).to.be.an("object");

        if (
            assertObject(schema?.properties?.inSet) &&
            assertObject(schema?.properties?.inSet?.items)
        ) {
            expect(schema?.properties?.inSet?.items?.$id).to.be.an("undefined");
            expect(schema?.properties?.inSet?.items?.properties).to.be.an("object");
        }

        if (
            assertObject(schema?.properties?.valueMapFunction) &&
            assertArray(schema?.properties?.valueMapFunction?.enum)
        ) {
            expect(schema?.properties?.valueMapFunction?.enum[0]).to.be.an("string");
            expect(schema?.properties?.valueMapFunction?.enum[1]).to.be.an("string");
            expect(schema?.properties?.valueMapFunction?.enum[2]).to.be.an("string");
            expect(schema?.properties?.valueMapFunction?.enum[3]).to.be.an("string");
            expect(schema?.properties?.valueMapFunction?.enum[4]).to.be.an("string");
        }
    });

    it("can create a validation function for a schema by schema id", async () => {
        JSONSchemasInterface.registerGlobalSchema({
            $id: "global",
            definitions: {
                "test-person": {
                    $id: "test/person",
                    $schema: "http://json-schema.org/draft-07/schema#",
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
