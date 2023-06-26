import { expect } from "chai";

import {
    buildDependencies,
    getSchemaWithDependencies,
    typeofSchema,
} from "../../src/utils/schemas";
import { DFT_SCHEMA, DFT_TREE_ADVANCED, DFT_TREE_SIMPLE, UNEVEN_TREE } from "../fixtures/schemas";

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
        // eslint-disable-next-line no-unused-expressions
        expect(dftCase.properties.spinOrbitCoupling.enum[0]).to.be.true;
        expect(dftCase.properties.spinOrbitCoupling.enum).to.have.length(1);
        // eslint-disable-next-line no-unused-expressions
        expect(dftCase.properties.spinOrbitCoupling.enumNames[0]).to.be.eql("true");
        expect(dftCase.properties.spinOrbitCoupling.enumNames).to.have.length(1);

        const [ldaCase, ggaCase] = dftCase.dependencies.subtype.oneOf;
        expect(ldaCase.properties).not.to.haveOwnProperty("spinPolarization");

        expect(ggaCase.properties.spinPolarization.enum).to.have.members(["collinear"]);
        expect(ggaCase.properties.spinPolarization.enumNames).to.have.members(["collinear"]);
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
        expect(typeCase.properties.type.enum[0]).to.be.equal("a");
        expect(typeCase.properties.subtype.enum).to.have.members(["b", "c", "d"]);

        const [cCase, dCase] = typeCase.dependencies.subtype.oneOf;
        expect(cCase.properties.subtype.enum[0]).to.be.equal("c");
        expect(cCase.properties.subsubtype.enum).to.have.members(["c1", "c2"]);

        expect(dCase.properties.subtype.enum[0]).to.be.equal("d");
        expect(dCase.properties.subsubtype.enum).to.have.members(["d1"]);

        const [xCase] = dCase.dependencies.subsubtype.oneOf;
        expect(xCase.properties.subsubtype.enum[0]).to.be.equal("d1");
        expect(xCase.properties.propX.enum[0]).to.be.equal("x");
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
