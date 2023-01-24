import { expect } from "chai";

import {
    buildDependenciesEnum,
    buildDependenciesOneOf,
    getSchemaWithDependencies,
    typeofSchema,
} from "../src/utils/schemas";

describe("RJSF schema", () => {
    const TREE = {
        path: "/dft",
        dataSelector: { key: "type", value: "data.type.enum[0]", name: "data.type.title" },
        data: {
            type: {
                enum: ["dft"],
                title: "Density Functional Theory",
            },
        },
        children: [
            {
                path: "/dft/lda",
                dataSelector: {
                    key: "subtype",
                    value: "data.subtype.enum[0]",
                    name: "data.subtype.title",
                },
                data: {
                    subtype: {
                        enum: ["lda"],
                        title: "LDA",
                    },
                },
                children: [
                    {
                        path: "/dft/lda/svwn",
                        dataSelector: {
                            key: "functional",
                            value: "data.functional.enum[0]",
                            name: "data.functional.title",
                        },
                        data: {
                            functional: {
                                enum: ["svwn"],
                                title: "SVWN",
                            },
                        },
                    },
                    {
                        path: "/dft/lda/pz",
                        dataSelector: {
                            key: "functional",
                            value: "data.functional.enum[0]",
                            name: "data.functional.title",
                        },
                        data: {
                            functional: {
                                enum: ["pz"],
                                title: "PZ",
                            },
                        },
                    },
                ],
            },
            {
                path: "/dft/gga",
                dataSelector: {
                    key: "subtype",
                    value: "data.subtype.enum[0]",
                    name: "data.subtype.title",
                },
                data: {
                    subtype: {
                        enum: ["gga"],
                        title: "GGA",
                    },
                },
                children: [
                    {
                        path: "/dft/gga/pbe",
                        dataSelector: {
                            key: "functional",
                            value: "data.functional.enum[0]",
                            name: "data.functional.title",
                        },
                        data: {
                            functional: {
                                enum: ["pbe"],
                                title: "PBE",
                            },
                        },
                    },
                    {
                        path: "/dft/gga/pw91",
                        dataSelector: {
                            key: "functional",
                            value: "data.functional.enum[0]",
                            name: "data.functional.title",
                        },
                        data: {
                            functional: {
                                enum: ["pw91"],
                                title: "PW91",
                            },
                        },
                    },
                ],
            },
        ],
    };
    const DFT_SCHEMA = {
        type: "object",
        properties: {
            type: {
                type: "string",
            },
            subtype: {
                type: "string",
            },
            functional: {
                type: "string",
            },
        },
    };

    it("dependencies block using 'enum' can be created from tree", () => {
        const dependencies = buildDependenciesEnum([TREE]);

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

    it("dependencies block using 'oneOf' can be created from tree", () => {
        const dependencies = buildDependenciesOneOf([TREE]);

        const [dftCase] = dependencies.dependencies.type.oneOf;
        expect(dftCase.properties.subtype.oneOf).to.have.length(2);
        expect(dftCase.properties.subtype.oneOf).to.deep.include({ title: "LDA", enum: ["lda"] });
        expect(dftCase.properties.subtype.oneOf).to.deep.include({ title: "GGA", enum: ["gga"] });

        const [ldaCase, ggaCase] = dftCase.dependencies.subtype.oneOf;
        expect(ldaCase.properties.functional.oneOf).to.have.length(2);
        expect(ldaCase.properties.functional.oneOf).to.deep.include({
            title: "SVWN",
            enum: ["svwn"],
        });
        expect(ldaCase.properties.functional.oneOf).to.deep.include({ title: "PZ", enum: ["pz"] });

        expect(ggaCase.properties.functional.oneOf).to.have.length(2);
        expect(ggaCase.properties.functional.oneOf).to.deep.include({
            title: "PBE",
            enum: ["pbe"],
        });
        expect(ggaCase.properties.functional.oneOf).to.deep.include({
            title: "PW91",
            enum: ["pw91"],
        });
    });

    it("can be created with dependencies from schema", () => {
        const rjsfSchema = getSchemaWithDependencies({
            schema: DFT_SCHEMA,
            nodes: [TREE],
            useEnum: true,
        });
        expect(rjsfSchema.type).to.be.eql(DFT_SCHEMA.type);
        expect(rjsfSchema.properties).to.be.eql(DFT_SCHEMA.properties);
        expect(rjsfSchema).to.have.property("dependencies");
    });

    it("enum and enumNames can be added to schema properties", () => {
        const rjsfSchema = getSchemaWithDependencies({
            schema: DFT_SCHEMA,
            nodes: [TREE],
            modifyProperties: true,
            useEnum: true,
        });
        // console.log(JSON.stringify(rjsfSchema, null, 4));
        expect(rjsfSchema.type).to.be.eql(DFT_SCHEMA.type);
        expect(rjsfSchema.properties.type).to.have.property("enum");
        expect(rjsfSchema.properties.type.enum).to.be.eql(["dft"]);
        expect(rjsfSchema.properties.type).to.have.property("enumNames");
        expect(rjsfSchema.properties.type.enumNames).to.be.eql(["Density Functional Theory"]);
        expect(rjsfSchema).to.have.property("dependencies");
    });

    it("title and const (enum) can be added to schema properties", () => {
        const rjsfSchema = getSchemaWithDependencies({
            schema: DFT_SCHEMA,
            nodes: [TREE],
            modifyProperties: true,
            useEnum: false,
        });
        // console.log(JSON.stringify(rjsfSchema, null, 4));
        expect(rjsfSchema.type).to.be.eql(DFT_SCHEMA.type);
        expect(rjsfSchema.properties.type).to.have.property("oneOf");
        expect(rjsfSchema.properties.type.oneOf).to.deep.include({
            title: "Density Functional Theory",
            enum: ["dft"],
        });
        expect(rjsfSchema).to.have.property("dependencies");
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
