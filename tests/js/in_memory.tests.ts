/* eslint-disable no-unused-expressions */
import { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import inMemoryEntitySchema from "@mat3ra/esse/dist/js/schema/in_memory_entity/base.json";
import { expect } from "chai";

import { InMemoryEntity } from "../../src/js/entity/in_memory";

class DerivedInMemoryEntity extends InMemoryEntity {
    static readonly jsonSchema = inMemoryEntitySchema as JSONSchema;
}

function validateEntity(entity: DerivedInMemoryEntity) {
    try {
        entity.validate();
    } catch (err) {
        return false;
    }
    return true;
}

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
        expect(entity.prop("b")).to.equal(undefined);
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
        const entity = new DerivedInMemoryEntity({ _id: "123", type: "type" });
        expect(JSON.stringify(entity.toJSON())).to.be.equal(
            JSON.stringify({ _id: "123", schemaVersion: "2022.8.16" }),
        );
    });

    it("jsonSchema returns correct registered schema", async () => {
        expect(DerivedInMemoryEntity.jsonSchema).to.be.an("object");
        expect(DerivedInMemoryEntity.jsonSchema).to.have.nested.property("properties._id"); // check mix schemas
    });

    it("jsonSchema validate", async () => {
        const validEntity = new DerivedInMemoryEntity({ _id: "123", slug: "slug" });
        const invalidEntity = new DerivedInMemoryEntity({ _id: "123", slug: ["slug"] });

        expect(validateEntity(validEntity)).to.be.true;
        expect(validateEntity(invalidEntity)).to.be.false;
    });

    it("jsonSchema clean", async () => {
        const config = {
            _id: "123",
            slug: "slug",
            additional: "additional",
        };
        const cleanConfig = new DerivedInMemoryEntity().clean({ ...config });

        expect(cleanConfig).to.be.deep.equal({
            _id: "123",
            slug: "slug",
            schemaVersion: "2022.8.16", // schema's default value
        });
    });
});
