/* eslint-disable no-unused-expressions */
import { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import inMemoryEntitySchema from "@mat3ra/esse/dist/js/schema/in_memory_entity/base.json";
import type { BaseInMemoryEntitySchema } from "@mat3ra/esse/dist/js/types";
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
    const obj: BaseInMemoryEntitySchema = {
        _id: "123",
        schemaVersion: "2022.8.16",
    };

    it("can be created", () => {
        const empty = new InMemoryEntity({});
        const entity = new InMemoryEntity(obj);

        expect(empty).to.exist;
        expect(entity).to.exist;
    });

    it("prop gets props", () => {
        const entity = new InMemoryEntity(obj);
        expect(entity._id).to.equal(obj._id);
        expect(entity.schemaVersion).to.equal(obj.schemaVersion);
        expect(entity.systemName).to.equal(undefined);
    });

    it("setProp sets props", () => {
        const entity = new InMemoryEntity(obj);
        entity.setProp("systemName", "b");
        expect(entity.systemName).to.equal("b");
        entity.setProp("slug", "c");
        expect(entity.slug).to.equal("c");
    });

    it("unsetProp unsets props", () => {
        const entity = new InMemoryEntity(obj);
        expect(entity._id).to.equal(obj._id);
        entity.unsetProp("_id");
        expect(entity._id).to.equal(undefined);
    });

    it("getAsEntityReference requires _id but not slug", () => {
        const withoutSlug = new InMemoryEntity({ _id: "123" });
        expect(withoutSlug.getAsEntityReference()).to.deep.equal({
            _id: "123",
            cls: "InMemoryEntity",
        });
        expect(withoutSlug.getAsEntityReference(true)).to.deep.equal({ _id: "123" });

        const withSlug = new InMemoryEntity({ _id: "123", slug: "total-energy" });
        expect(withSlug.getAsEntityReference()).to.deep.equal({
            _id: "123",
            slug: "total-energy",
            cls: "InMemoryEntity",
        });

        const missingId = new InMemoryEntity({});
        expect(() => missingId.getAsEntityReference()).to.throw("ENTITY_REFERENCE_ERROR");
    });

    it("toJSON converts to JSON", () => {
        const entity = new DerivedInMemoryEntity({
            _id: "123",
            additional: "additional",
        } as BaseInMemoryEntitySchema);
        expect(JSON.stringify(entity.toJSON())).to.be.equal(
            JSON.stringify({ _id: "123", schemaVersion: "2022.8.16" }),
        );
    });

    it("toJSON ignores JSON.stringify property-key argument so fields are not stripped", () => {
        // JSON.stringify calls value.toJSON(key) when serializing a nested object.
        // systemTeams.owner → toJSON("owner") must not omit the entity's owner field.
        const entity = new DerivedInMemoryEntity({
            _id: "123",
            slug: "owner",
        } as BaseInMemoryEntitySchema);

        expect(entity.toJSON("owner" as unknown as (keyof BaseInMemoryEntitySchema)[])).to.include({
            _id: "123",
            slug: "owner",
        });

        const wrapped = { owner: entity };
        const parsed = JSON.parse(JSON.stringify(wrapped));
        expect(parsed.owner).to.include({ _id: "123", slug: "owner" });
    });

    it("toJSON still omits when given an explicit exclude array", () => {
        const entity = new DerivedInMemoryEntity({
            _id: "123",
            slug: "owner",
        } as BaseInMemoryEntitySchema);

        expect(entity.toJSON(["slug"])).to.deep.equal({
            _id: "123",
            schemaVersion: "2022.8.16",
        });
    });

    it("jsonSchema returns correct registered schema", async () => {
        expect(DerivedInMemoryEntity.jsonSchema).to.be.an("object");
        expect(DerivedInMemoryEntity.jsonSchema).to.have.nested.property("properties._id"); // check mix schemas
    });

    it("jsonSchema validate", async () => {
        const validEntity = new DerivedInMemoryEntity({ _id: "123", slug: "slug" });
        const invalidEntity = new DerivedInMemoryEntity({
            _id: "123",
            slug: ["slug"],
        } as unknown as BaseInMemoryEntitySchema);

        expect(validateEntity(validEntity)).to.be.true;
        expect(validateEntity(invalidEntity)).to.be.false;
    });

    it("jsonSchema clean", async () => {
        const config = {
            _id: "123",
            slug: "slug",
            additional: "additional",
        };
        const cleanConfig = new DerivedInMemoryEntity({}).clean({ ...config });

        expect(cleanConfig).to.be.deep.equal({
            _id: "123",
            slug: "slug",
            schemaVersion: "2022.8.16", // schema's default value
        });
    });
});
