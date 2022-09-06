/* eslint-disable max-classes-per-file */
import { expect } from "chai";

import { InMemoryEntity } from "../src/entity/in_memory";
import { entityMix, registerClassName } from "../src/utils/schemas";

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

    it("jsonSchema returns correct schema", () => {
        class Entity extends InMemoryEntity {
            static get customJsonSchemaProperties() {
                return {
                    nested: {
                        type: "string",
                    },
                };
            }
        }
        expect(Entity.jsonSchema).to.be.an("object");
        expect(Entity.jsonSchema).to.have.nested.property("properties.isDefault"); // check mix schemas
        expect(Entity.jsonSchema).to.have.nested.property("properties.nested.type"); // check custom properties
    });

    it("jsonSchema returns correct registered schema", () => {
        class RegisteredEntity extends InMemoryEntity {
            static get customJsonSchemaProperties() {
                return {
                    nested: {
                        type: "string",
                    },
                };
            }
        }

        registerClassName(RegisteredEntity.name, "system/entity", entityMix);

        expect(RegisteredEntity.jsonSchema).to.be.an("object");
        expect(RegisteredEntity.jsonSchema).to.have.nested.property("properties.isDefault"); // check mix schemas
        expect(RegisteredEntity.jsonSchema).to.have.nested.property("properties.nested.type"); // check custom properties
    });
});
