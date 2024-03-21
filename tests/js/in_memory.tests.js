const __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
const base_json_1 = __importDefault(
    require("@mat3ra/esse/lib/js/schema/in_memory_entity/base.json"),
);
const chai_1 = require("chai");
const in_memory_1 = require("../../src/js/entity/in_memory");

class DerivedInMemoryEntity extends in_memory_1.InMemoryEntity {}
DerivedInMemoryEntity.jsonSchema = base_json_1.default;
function validateEntity(entity) {
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
        const empty = new in_memory_1.InMemoryEntity();
        // eslint-disable-next-line no-unused-expressions
        (0, chai_1.expect)(empty).to.exist;
        const entity = new in_memory_1.InMemoryEntity(obj);
        // eslint-disable-next-line no-unused-expressions
        (0, chai_1.expect)(entity).to.exist;
    });
    it("prop gets props", () => {
        const entity = new in_memory_1.InMemoryEntity(obj);
        (0, chai_1.expect)(entity.prop("a")).to.equal("b");
        (0, chai_1.expect)(entity.prop("b")).to.equal(undefined);
        (0, chai_1.expect)(entity.prop("b", "a")).to.equal("a");
    });
    it("setProp sets props", () => {
        const entity = new in_memory_1.InMemoryEntity(obj);
        (0, chai_1.expect)(entity.prop("a")).to.equal("b");
        entity.setProp("b", "c");
        (0, chai_1.expect)(entity.prop("b")).to.equal("c");
        entity.setProp("a", "d");
        (0, chai_1.expect)(entity.prop("a")).to.equal("d");
    });
    it("unsetProp unsets props", () => {
        const entity = new in_memory_1.InMemoryEntity(obj);
        (0, chai_1.expect)(entity.prop("a")).to.equal("b");
        entity.unsetProp("a");
        // eslint-disable-next-line no-unused-expressions
        (0, chai_1.expect)(entity.prop("a")).not.to.exist;
    });
    it("toJSON converts to JSON", () => {
        const entity = new DerivedInMemoryEntity({ _id: "123", type: "type" });
        (0, chai_1.expect)(JSON.stringify(entity.toJSON())).to.be.equal(
            JSON.stringify({ _id: "123", schemaVersion: "2022.8.16" }),
        );
    });
    it("jsonSchema returns correct registered schema", async () => {
        (0, chai_1.expect)(DerivedInMemoryEntity.jsonSchema).to.be.an("object");
        (0, chai_1.expect)(DerivedInMemoryEntity.jsonSchema).to.have.nested.property(
            "properties._id",
        ); // check mix schemas
    });
    it("jsonSchema validate", async () => {
        const validEntity = new DerivedInMemoryEntity({ _id: "123", slug: "slug" });
        const invalidEntity = new DerivedInMemoryEntity({ _id: "123", slug: ["slug"] });
        (0, chai_1.expect)(validateEntity(validEntity)).to.be.true;
        (0, chai_1.expect)(validateEntity(invalidEntity)).to.be.false;
    });
    it("jsonSchema clean", async () => {
        const config = {
            _id: "123",
            slug: "slug",
            additional: "additional",
        };
        const cleanConfig = new DerivedInMemoryEntity().clean({ ...config });
        (0, chai_1.expect)(cleanConfig).to.be.deep.equal({
            _id: "123",
            slug: "slug",
            schemaVersion: "2022.8.16", // schema's default value
        });
    });
});
