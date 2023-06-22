export const DFT_SCHEMA = {
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

export const DFT_TREE_SIMPLE = {
    path: "/dft",
    data: { key: "type", value: "dft", name: "Density Functional Theory" },
    children: [
        {
            path: "/dft/lda",
            data: {
                key: "subtype",
                value: "lda",
                name: "LDA",
            },
            children: [
                {
                    path: "/dft/lda/svwn",
                    data: {
                        key: "functional",
                        value: "svwn",
                        name: "SVWN",
                    },
                },
                {
                    path: "/dft/lda/pz",
                    data: {
                        key: "functional",
                        value: "pz",
                        name: "PZ",
                    },
                },
            ],
        },
        {
            path: "/dft/gga",
            data: {
                key: "subtype",
                value: "gga",
                name: "GGA",
            },
            children: [
                {
                    path: "/dft/gga/pbe",
                    data: {
                        key: "functional",
                        value: "pbe",
                        name: "PBE",
                    },
                },
                {
                    path: "/dft/gga/pw91",
                    data: {
                        key: "functional",
                        value: "pw91",
                        name: "PW91",
                    },
                },
            ],
        },
    ],
};

export const DFT_TREE_ADVANCED = {
    path: "/dft",
    data: { key: "type", value: "dft", name: "Density Functional Theory" },
    children: [
        {
            path: "/dft/lda",
            data: {
                key: "subtype",
                value: "lda",
                name: "LDA",
            },
            children: [
                {
                    path: "/dft/lda/svwn",
                    data: {
                        key: "functional",
                        value: "svwn",
                        name: "SVWN",
                    },
                },
                {
                    path: "/dft/lda/pz",
                    data: {
                        key: "functional",
                        value: "pz",
                        name: "PZ",
                    },
                },
            ],
        },
        {
            path: "/dft/gga",
            data: {
                key: "subtype",
                value: "gga",
                name: "GGA",
            },
            children: [
                {
                    path: "/dft/gga/pbe",
                    data: {
                        key: "functional",
                        value: "pbe",
                        name: "PBE",
                    },
                },
                {
                    path: "/dft/gga/pw91",
                    data: {
                        key: "functional",
                        value: "pw91",
                        name: "PW91",
                    },
                },
            ],
            staticOptions: [
                {
                    key: "spinPolarization",
                    values: ["collinear"],
                },
            ],
        },
    ],
    staticOptions: [
        {
            key: "dispersionCorrection",
            values: ["dft-d3"],
            namesMap: {
                "dft-d3": "DFT-D3",
            },
        },
        {
            key: "spinOrbitCoupling",
            values: [true],
        },
    ],
};
