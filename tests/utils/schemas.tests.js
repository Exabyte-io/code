/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import {
    buildDependencies,
    getSchemaWithDependencies,
    typeofSchema,
} from "../../src/utils/schemas";
import {
    DFT_SCHEMA,
    DFT_TREE_ADVANCED,
    DFT_TREE_SIMPLE,
    TREE_STATIC_TERMINAL,
    UNEVEN_TREE,
} from "../fixtures/schemas";

describe("RJSF schema", () => {
    it("dependencies block can be created from tree", () => {
        const dependencies = buildDependencies([DFT_TREE_SIMPLE]);

        const [dftCase] = dependencies.dependencies.type.oneOf;
        expect(dftCase.properties.subtype.enum).to.have.ordered.members(["lda", "gga"]);
        expect(dftCase.properties.subtype.enumNames).to.have.ordered.members(["LDA", "GGA"]);

        const [ldaCase, ggaCase] = dftCase.dependencies.subtype.oneOf;
        expect(ldaCase.properties.subtype.enum).to.have.length(1);
        expect(ldaCase.properties.functional.enum).to.have.ordered.members(["svwn", "pz"]);
        expect(ldaCase.properties.functional.enumNames).to.have.ordered.members(["SVWN", "PZ"]);
        expect(ldaCase).to.not.have.property("dependencies");

        expect(ggaCase.properties.subtype.enum).to.have.length(1);
        expect(ggaCase.properties.functional.enum).to.have.ordered.members(["pbe", "pw91"]);
        expect(ggaCase.properties.functional.enumNames).to.have.ordered.members(["PBE", "PW91"]);
        expect(ggaCase).to.not.have.property("dependencies");
    });

    it("should create static options in dependency block if present in node", () => {
        const dependencies = buildDependencies([DFT_TREE_ADVANCED]);

        const [dftCase] = dependencies.dependencies.type.oneOf;
        expect(dftCase.properties.spinOrbitCoupling.enum).to.have.members([true]);
        expect(dftCase.properties.spinOrbitCoupling.enumNames).to.have.members(["true"]);

        const [ldaCase, ggaCase] = dftCase.dependencies.subtype.oneOf;
        expect(ldaCase.properties).not.to.haveOwnProperty("spinPolarization");

        expect(ggaCase.properties.spinPolarization.enum).to.have.members(["collinear"]);
        expect(ggaCase.properties.spinPolarization.enumNames).to.have.members(["collinear"]);
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
            schema: DFT_SCHEMA,
            nodes: [DFT_TREE_SIMPLE],
        });
        expect(rjsfSchema.type).to.be.eql(DFT_SCHEMA.type);
        expect(rjsfSchema.properties).to.be.eql(DFT_SCHEMA.properties);
        expect(rjsfSchema).to.have.property("dependencies");
    });

    it("enum and enumNames can be added to schema properties", () => {
        const rjsfSchema = getSchemaWithDependencies({
            schema: DFT_SCHEMA,
            nodes: [DFT_TREE_SIMPLE],
            modifyProperties: true,
        });
        expect(rjsfSchema.type).to.be.eql(DFT_SCHEMA.type);
        expect(rjsfSchema.properties.type).to.have.property("enum");
        expect(rjsfSchema.properties.type.enum).to.be.eql(["dft"]);
        expect(rjsfSchema.properties.type).to.have.property("enumNames");
        expect(rjsfSchema.properties.type.enumNames).to.be.eql(["Density Functional Theory"]);
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
