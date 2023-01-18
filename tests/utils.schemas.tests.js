import { expect } from "chai";

import { buildDependencies } from "../src/utils/schemas";

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
    it("can be created with dependencies from tree", () => {
        const dependencies = buildDependencies([tree]);
        console.log(JSON.stringify(dependencies, null, 4));

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
});
