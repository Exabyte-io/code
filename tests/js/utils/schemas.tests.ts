/* eslint-disable no-unused-expressions */
// @ts-nocheck
/* eslint-disable no-unsafe-optional-chaining */
import { expect } from "chai";

import {
    buildDependencies,
    getSchemaWithDependencies,
    typeofSchema,
} from "../../../src/js/utils/schemas";
import {
    EXAMPLE_SCHEMA,
    TREE_ADVANCED,
    TREE_SIMPLE,
    TREE_STATIC_TERMINAL,
    UNEVEN_TREE,
} from "../fixtures/rjsf_schemas";

describe("RJSF schema", () => {
    it("dependencies block can be created from tree", () => {
        const dependencies = buildDependencies([TREE_SIMPLE]);

        const [aCase] = dependencies.dependencies.type.oneOf;
        expect(aCase.properties.subtype.enum).to.have.ordered.members(["b", "c"]);
        expect(aCase.properties.subtype.enumNames).to.have.ordered.members(["B", "C"]);

        const [bCase, cCase] = aCase.dependencies.subtype.oneOf;
        expect(bCase.properties.subtype.enum).to.have.length(1);
        expect(bCase.properties.subsubtype.enum).to.have.ordered.members(["d", "e"]);
        expect(bCase.properties.subsubtype.enumNames).to.have.ordered.members(["D", "E"]);
        expect(bCase).to.not.have.property("dependencies");

        expect(cCase.properties.subtype.enum).to.have.length(1);
        expect(cCase.properties.subsubtype.enum).to.have.ordered.members(["f", "g"]);
        expect(cCase.properties.subsubtype.enumNames).to.have.ordered.members(["F", "G"]);
        expect(cCase).to.not.have.property("dependencies");
    });

    it("should create static options in dependency block if present in node", () => {
        const dependencies = buildDependencies([TREE_ADVANCED]);

        const [aCase] = dependencies.dependencies.type.oneOf;
        expect(aCase.properties.staticA2.enum).to.have.members([true]);
        expect(aCase.properties.staticA2.enumNames).to.have.members(["true"]);

        const [bCase, cCase] = aCase.dependencies.subtype.oneOf;
        expect(bCase.properties).not.to.haveOwnProperty("staticC");

        expect(cCase.properties.staticC.enum).to.have.members(["static_c"]);
        expect(cCase.properties.staticC.enumNames).to.have.members(["static_c"]);
    });

    it("should create static options from terminal nodes of dependency tree", () => {
        const dependencies = buildDependencies([TREE_STATIC_TERMINAL]);

        const [typeCase] = dependencies.dependencies.type.oneOf;
        expect(typeCase.properties.type.enum).to.have.members(["a"]);
        expect(typeCase.properties.subtype.enum).to.have.members(["b", "c"]);

        const [bCase, cCase] = typeCase.dependencies.subtype.oneOf;
        expect(bCase.properties.subtype.enum).to.have.members(["b"]);

        expect(cCase.properties.subtype.enum).to.have.members(["c"]);
        expect(cCase.properties.subsubtype.enum).to.have.members(["c1", "c2"]);

        const [c1Case, c2Case] = cCase.dependencies.subsubtype.oneOf;
        expect(c1Case).to.not.be.undefined;
        expect(c1Case.properties.subsubtype.enum).to.have.members(["c1"]);
        expect(c1Case.properties.static.enum).to.have.members(["static1", "static2", "static3"]);

        expect(c2Case).to.not.be.undefined;
        expect(c2Case.properties.subsubtype.enum).to.have.members(["c2"]);
    });

    it("can be created with dependencies from schema", () => {
        const rjsfSchema = getSchemaWithDependencies({
            schema: EXAMPLE_SCHEMA,
            nodes: [TREE_SIMPLE],
        });
        expect(rjsfSchema.type).to.be.eql(EXAMPLE_SCHEMA.type);
        expect(rjsfSchema.properties).to.be.eql(EXAMPLE_SCHEMA.properties);
        expect(rjsfSchema).to.have.property("dependencies");
    });

    it("enum and enumNames can be added to schema properties", () => {
        const rjsfSchema = getSchemaWithDependencies({
            schema: EXAMPLE_SCHEMA,
            nodes: [TREE_SIMPLE],
            modifyProperties: true,
        });
        expect(rjsfSchema.type).to.be.eql(EXAMPLE_SCHEMA.type);
        expect(rjsfSchema.properties.type).to.have.property("enum");
        expect(rjsfSchema.properties.type.enum).to.be.eql(["a"]);
        expect(rjsfSchema.properties.type).to.have.property("enumNames");
        expect(rjsfSchema.properties.type.enumNames).to.be.eql(["A"]);
        expect(rjsfSchema).to.have.property("dependencies");
    });

    it("should correctly create dependencies from an uneven tree", () => {
        const dependencies = buildDependencies([UNEVEN_TREE]);

        const [typeCase] = dependencies.dependencies.type.oneOf;
        expect(typeCase.properties.type.enum).to.have.members(["a"]);
        expect(typeCase.properties.subtype.enum).to.have.members(["b", "c", "d"]);

        const [bCase, cCase, dCase] = typeCase.dependencies.subtype.oneOf;
        expect(bCase.properties.subtype.enum).to.have.members(["b"]);

        expect(cCase.properties.subtype.enum).to.have.members(["c"]);
        expect(cCase.properties.subsubtype.enum).to.have.members(["c1", "c2"]);

        expect(dCase.properties.subtype.enum).to.have.members(["d"]);
        expect(dCase.properties.subsubtype.enum).to.have.members(["d1"]);

        const [xCase] = dCase.dependencies.subsubtype.oneOf;
        expect(xCase.properties.subsubtype.enum).to.have.members(["d1"]);
        expect(xCase.properties.propX.enum).to.have.members(["x"]);
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
            const currentType = typeofSchema(schema);
            expect(currentType).to.be.equal(type);
        });
        expect(typeofSchema(objSchemaNoType)).to.be.equal("object");
        expect(typeofSchema(arraySchemaNoType)).to.be.equal("array");
    });
});
