Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-expressions */
// @ts-nocheck
/* eslint-disable no-unsafe-optional-chaining */
const chai_1 = require("chai");
const schemas_1 = require("../../../src/js/utils/schemas");
const rjsf_schemas_1 = require("../fixtures/rjsf_schemas");

describe("RJSF schema", () => {
    it("dependencies block can be created from tree", () => {
        const dependencies = (0, schemas_1.buildDependencies)([rjsf_schemas_1.TREE_SIMPLE]);
        const [aCase] = dependencies.dependencies.type.oneOf;
        (0, chai_1.expect)(aCase.properties.subtype.enum).to.have.ordered.members(["b", "c"]);
        (0, chai_1.expect)(aCase.properties.subtype.enumNames).to.have.ordered.members(["B", "C"]);
        const [bCase, cCase] = aCase.dependencies.subtype.oneOf;
        (0, chai_1.expect)(bCase.properties.subtype.enum).to.have.length(1);
        (0, chai_1.expect)(bCase.properties.subsubtype.enum).to.have.ordered.members(["d", "e"]);
        (0, chai_1.expect)(bCase.properties.subsubtype.enumNames).to.have.ordered.members([
            "D",
            "E",
        ]);
        (0, chai_1.expect)(bCase).to.not.have.property("dependencies");
        (0, chai_1.expect)(cCase.properties.subtype.enum).to.have.length(1);
        (0, chai_1.expect)(cCase.properties.subsubtype.enum).to.have.ordered.members(["f", "g"]);
        (0, chai_1.expect)(cCase.properties.subsubtype.enumNames).to.have.ordered.members([
            "F",
            "G",
        ]);
        (0, chai_1.expect)(cCase).to.not.have.property("dependencies");
    });
    it("should create static options in dependency block if present in node", () => {
        const dependencies = (0, schemas_1.buildDependencies)([rjsf_schemas_1.TREE_ADVANCED]);
        const [aCase] = dependencies.dependencies.type.oneOf;
        (0, chai_1.expect)(aCase.properties.staticA2.enum).to.have.members([true]);
        (0, chai_1.expect)(aCase.properties.staticA2.enumNames).to.have.members(["true"]);
        const [bCase, cCase] = aCase.dependencies.subtype.oneOf;
        (0, chai_1.expect)(bCase.properties).not.to.haveOwnProperty("staticC");
        (0, chai_1.expect)(cCase.properties.staticC.enum).to.have.members(["static_c"]);
        (0, chai_1.expect)(cCase.properties.staticC.enumNames).to.have.members(["static_c"]);
    });
    it("should create static options from terminal nodes of dependency tree", () => {
        const dependencies = (0, schemas_1.buildDependencies)([
            rjsf_schemas_1.TREE_STATIC_TERMINAL,
        ]);
        const [typeCase] = dependencies.dependencies.type.oneOf;
        (0, chai_1.expect)(typeCase.properties.type.enum).to.have.members(["a"]);
        (0, chai_1.expect)(typeCase.properties.subtype.enum).to.have.members(["b", "c"]);
        const [bCase, cCase] = typeCase.dependencies.subtype.oneOf;
        (0, chai_1.expect)(bCase.properties.subtype.enum).to.have.members(["b"]);
        (0, chai_1.expect)(cCase.properties.subtype.enum).to.have.members(["c"]);
        (0, chai_1.expect)(cCase.properties.subsubtype.enum).to.have.members(["c1", "c2"]);
        const [c1Case, c2Case] = cCase.dependencies.subsubtype.oneOf;
        (0, chai_1.expect)(c1Case).to.not.be.undefined;
        (0, chai_1.expect)(c1Case.properties.subsubtype.enum).to.have.members(["c1"]);
        (0, chai_1.expect)(c1Case.properties.static.enum).to.have.members([
            "static1",
            "static2",
            "static3",
        ]);
        (0, chai_1.expect)(c2Case).to.not.be.undefined;
        (0, chai_1.expect)(c2Case.properties.subsubtype.enum).to.have.members(["c2"]);
    });
    it("can be created with dependencies from schema", () => {
        const rjsfSchema = (0, schemas_1.getSchemaWithDependencies)({
            schema: rjsf_schemas_1.EXAMPLE_SCHEMA,
            nodes: [rjsf_schemas_1.TREE_SIMPLE],
        });
        (0, chai_1.expect)(rjsfSchema.type).to.be.eql(rjsf_schemas_1.EXAMPLE_SCHEMA.type);
        (0, chai_1.expect)(rjsfSchema.properties).to.be.eql(
            rjsf_schemas_1.EXAMPLE_SCHEMA.properties,
        );
        (0, chai_1.expect)(rjsfSchema).to.have.property("dependencies");
    });
    it("enum and enumNames can be added to schema properties", () => {
        const rjsfSchema = (0, schemas_1.getSchemaWithDependencies)({
            schema: rjsf_schemas_1.EXAMPLE_SCHEMA,
            nodes: [rjsf_schemas_1.TREE_SIMPLE],
            modifyProperties: true,
        });
        (0, chai_1.expect)(rjsfSchema.type).to.be.eql(rjsf_schemas_1.EXAMPLE_SCHEMA.type);
        (0, chai_1.expect)(rjsfSchema.properties.type).to.have.property("enum");
        (0, chai_1.expect)(rjsfSchema.properties.type.enum).to.be.eql(["a"]);
        (0, chai_1.expect)(rjsfSchema.properties.type).to.have.property("enumNames");
        (0, chai_1.expect)(rjsfSchema.properties.type.enumNames).to.be.eql(["A"]);
        (0, chai_1.expect)(rjsfSchema).to.have.property("dependencies");
    });
    it("should correctly create dependencies from an uneven tree", () => {
        const dependencies = (0, schemas_1.buildDependencies)([rjsf_schemas_1.UNEVEN_TREE]);
        const [typeCase] = dependencies.dependencies.type.oneOf;
        (0, chai_1.expect)(typeCase.properties.type.enum).to.have.members(["a"]);
        (0, chai_1.expect)(typeCase.properties.subtype.enum).to.have.members(["b", "c", "d"]);
        const [bCase, cCase, dCase] = typeCase.dependencies.subtype.oneOf;
        (0, chai_1.expect)(bCase.properties.subtype.enum).to.have.members(["b"]);
        (0, chai_1.expect)(cCase.properties.subtype.enum).to.have.members(["c"]);
        (0, chai_1.expect)(cCase.properties.subsubtype.enum).to.have.members(["c1", "c2"]);
        (0, chai_1.expect)(dCase.properties.subtype.enum).to.have.members(["d"]);
        (0, chai_1.expect)(dCase.properties.subsubtype.enum).to.have.members(["d1"]);
        const [xCase] = dCase.dependencies.subsubtype.oneOf;
        (0, chai_1.expect)(xCase.properties.subsubtype.enum).to.have.members(["d1"]);
        (0, chai_1.expect)(xCase.properties.propX.enum).to.have.members(["x"]);
    });
});
describe("Schema utility", () => {
    const schemas = [
        ["string", { type: "string" }],
        ["integer", { type: "integer" }],
        ["number", { type: "number" }],
        ["object", { type: "object" }],
        ["array", { type: "array" }],
    ];
    const objSchemaNoType = { properties: { name: { type: "string" } } };
    const arraySchemaNoType = { items: { type: "number" } };
    it("type can be determined correctly", () => {
        schemas.forEach(([type, schema]) => {
            const currentType = (0, schemas_1.typeofSchema)(schema);
            (0, chai_1.expect)(currentType).to.be.equal(type);
        });
        (0, chai_1.expect)((0, schemas_1.typeofSchema)(objSchemaNoType)).to.be.equal("object");
        (0, chai_1.expect)((0, schemas_1.typeofSchema)(arraySchemaNoType)).to.be.equal("array");
    });
});
