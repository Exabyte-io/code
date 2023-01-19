import { expect } from "chai";

import { buildDependencies, getSchemaWithDependencies, typeofSchema } from "../src/utils/schemas";

describe("RJSF schema", () => {
    const tree = {
        path: "/dft",
        dataSelector: { key: "type", value: "data.type.slug", name: "data.type.name" },
        data: {
            type: {
                slug: "dft",
                name: "Density Functional Theory",
            },
        },
        children: [
            {
                path: "/dft/lda",
                dataSelector: {
                    key: "subtype",
                    value: "data.subtype.slug",
                    name: "data.subtype.name",
                },
                data: {
                    subtype: {
                        slug: "lda",
                        name: "LDA",
                    },
                },
                children: [
                    {
                        path: "/dft/lda/svwn",
                        dataSelector: {
                            key: "functional",
                            value: "data.functional.slug",
                            name: "data.functional.name",
                        },
                        data: {
                            functional: {
                                slug: "svwn",
                                name: "SVWN",
                            },
                        },
                    },
                    {
                        path: "/dft/lda/pz",
                        dataSelector: {
                            key: "functional",
                            value: "data.functional.slug",
                            name: "data.functional.name",
                        },
                        data: {
                            functional: {
                                slug: "pz",
                                name: "PZ",
                            },
                        },
                    },
                ],
            },
            {
                path: "/dft/gga",
                dataSelector: {
                    key: "subtype",
                    value: "data.subtype.slug",
                    name: "data.subtype.name",
                },
                data: {
                    subtype: {
                        slug: "gga",
                        name: "GGA",
                    },
                },
                children: [
                    {
                        path: "/dft/gga/pbe",
                        dataSelector: {
                            key: "functional",
                            value: "data.functional.slug",
                            name: "data.functional.name",
                        },
                        data: {
                            functional: {
                                slug: "pbe",
                                name: "PBE",
                            },
                        },
                    },
                    {
                        path: "/dft/gga/pw91",
                        dataSelector: {
                            key: "functional",
                            value: "data.functional.slug",
                            name: "data.functional.name",
                        },
                        data: {
                            functional: {
                                slug: "pw91",
                                name: "PW91",
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

    it("dependencies block can be created from tree", () => {
        const dependencies = buildDependencies([tree]);

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

    it("can be created with dependencies from schema", () => {
        const rjsfSchema = getSchemaWithDependencies({
            schema: DFT_SCHEMA,
            nodes: [tree],
        });
        // console.log(JSON.stringify(rjsfSchema, null, 4));
        expect(rjsfSchema.type).to.be.eql(DFT_SCHEMA.type);
        expect(rjsfSchema.properties).to.be.eql(DFT_SCHEMA.properties);
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
