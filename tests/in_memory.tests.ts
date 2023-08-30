import { expect } from "chai";

import { InMemoryEntity } from "../src/entity/in_memory";
import { JSONSchemasInterface } from "../src/JSONSchemasInterface";
import { registerClassName } from "../src/utils/schemas";

describe("InMemoryEntity", () => {
    const obj = {
        a: "b",
        name: "test",
    };

    it("can be created", () => {
        const empty = new InMemoryEntity();
        // eslint-disable-next-line no-unused-expressions
        expect(empty).to.exist;
        const entity = new InMemoryEntity(obj);
        // eslint-disable-next-line no-unused-expressions
        expect(entity).to.exist;
    });

    it("prop gets props", () => {
        const entity = new InMemoryEntity(obj);
        expect(entity.prop("a")).to.equal("b");
        expect(entity.prop("b")).to.equal(null);
        expect(entity.prop("b", "a")).to.equal("a");
    });

    it("setProp sets props", () => {
        const entity = new InMemoryEntity(obj);
        expect(entity.prop("a")).to.equal("b");
        entity.setProp("b", "c");
        expect(entity.prop("b")).to.equal("c");
        entity.setProp("a", "d");
        expect(entity.prop("a")).to.equal("d");
    });

    it("unsetProp unsets props", () => {
        const entity = new InMemoryEntity(obj);
        expect(entity.prop("a")).to.equal("b");
        entity.unsetProp("a");
        // eslint-disable-next-line no-unused-expressions
        expect(entity.prop("a")).not.to.exist;
    });

    it("toJSON converts to JSON", () => {
        const entity = new InMemoryEntity(obj);
        expect(JSON.stringify(entity.toJSON())).to.be.equal(JSON.stringify(obj));
    });

    it("jsonSchema returns correct registered schema", async () => {
        class RegisteredEntity extends InMemoryEntity {}

        registerClassName(RegisteredEntity.name, "in-memory-entity/base");

        JSONSchemasInterface.registerGlobalSchema({
            definitions: {
                "in-memory-entity-base": {
                    $id: "in-memory-entity/base",
                    $schema: "http://json-schema.org/draft-04/schema#",
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
            },
        });

        expect(RegisteredEntity.jsonSchema).to.be.an("object");
        expect(RegisteredEntity.jsonSchema).to.have.nested.property("properties._id"); // check mix schemas
    });

    it("jsonSchema validate", async () => {
        class RegisteredEntity extends InMemoryEntity {}

        registerClassName(RegisteredEntity.name, "in-memory-entity/base");

        JSONSchemasInterface.registerGlobalSchema({
            definitions: {
                "in-memory-entity-base": {
                    $id: "in-memory-entity/base",
                    $schema: "http://json-schema.org/draft-04/schema#",
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
            },
        });

        const invalidEntity = new RegisteredEntity({
            _id: "123",
            type: false,
        });

        expect(invalidEntity.validate()).to.be.false;

        const validEntity = new RegisteredEntity({
            _id: "123",
            type: "type",
        });

        expect(validEntity.validate()).to.be.true;
    });

    it("jsonSchema clean", async () => {
        class RegisteredEntity extends InMemoryEntity {}

        registerClassName(RegisteredEntity.name, "in-memory-entity/base");

        JSONSchemasInterface.registerGlobalSchema({
            definitions: {
                "in-memory-entity-base": {
                    $id: "in-memory-entity/base",
                    $schema: "http://json-schema.org/draft-04/schema#",
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
            },
        });

        const invalidEntity = new RegisteredEntity({
            _id: "123",
            type: false,
            additional: "additional",
        });

        const cleanConfig = invalidEntity.clean({
            _id: "123",
            type: "type",
            additional: "additional",
        });

        expect(cleanConfig).to.be.deep.equal({
            _id: "123",
            type: "type",
        });
    });
});
