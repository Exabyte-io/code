import { assert, expect } from "chai";

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
            schemaId: "system/in-set",
            $schema: "http://json-schema.org/draft-04/schema#",
            title: "System in-set schema",
            properties: {
                inSet: {
                    type: "array",
                    items: {
                        allOf: [
                            {
                                schemaId: "system/entity-reference",
                                $schema: "http://json-schema.org/draft-04/schema#",
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
            },
        });

        const schema = JSONSchemasInterface.schemaById("system/in-set");

        expect(schema).to.be.an("object");
        assert(schema.schemaId, "system/in-set");
        expect(schema.properties.inSet.items.schemaId).to.be.an("undefined");
        expect(schema.properties.inSet.items.properties).to.be.an("object");
    });
});
