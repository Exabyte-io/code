import { expect } from "chai";
import { InMemoryEntity } from "../src/entity/in_memory";

describe("InMemoryEntity", () => {

    const obj = {
        "a": "b",
        "name": "test",
    }

    it("can be created", () => {
        const empty = new InMemoryEntity();
        expect(empty).to.exist;
        const entity = new InMemoryEntity(obj);
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
        expect(entity.prop("a")).not.to.exist;
    });

    it("toJSON converts to JSON", () => {
        const entity = new InMemoryEntity(obj);
        expect(JSON.stringify(entity.toJSON())).to.be.equal(JSON.stringify(obj));
    });

});
