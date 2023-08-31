export const EXAMPLE_SCHEMA = {
    type: "object",
    properties: {
        type: {
            type: "string",
        },
        subtype: {
            type: "string",
        },
        subsubtype: {
            type: "string",
        },
    },
};

export const TREE_SIMPLE = {
    path: "/A",
    data: { key: "type", value: "a", name: "A" },
    children: [
        {
            path: "/A/B",
            data: {
                key: "subtype",
                value: "b",
                name: "B",
            },
            children: [
                {
                    path: "/A/B/D",
                    data: {
                        key: "subsubtype",
                        value: "d",
                        name: "D",
                    },
                },
                {
                    path: "/A/B/E",
                    data: {
                        key: "subsubtype",
                        value: "e",
                        name: "E",
                    },
                },
            ],
        },
        {
            path: "/A/C",
            data: {
                key: "subtype",
                value: "c",
                name: "C",
            },
            children: [
                {
                    path: "/A/C/F",
                    data: {
                        key: "subsubtype",
                        value: "f",
                        name: "F",
                    },
                },
                {
                    path: "/A/C/G",
                    data: {
                        key: "subsubtype",
                        value: "g",
                        name: "G",
                    },
                },
            ],
        },
    ],
};

export const TREE_ADVANCED = {
    path: "/A",
    data: { key: "type", value: "a", name: "A" },
    children: [
        {
            path: "/A/B",
            data: {
                key: "subtype",
                value: "b",
                name: "B",
            },
            children: [
                {
                    path: "/A/B/D",
                    data: {
                        key: "subsubtype",
                        value: "d",
                        name: "D",
                    },
                },
                {
                    path: "/A/B/E",
                    data: {
                        key: "subsubtype",
                        value: "e",
                        name: "E",
                    },
                },
            ],
        },
        {
            path: "/A/C",
            data: {
                key: "subtype",
                value: "c",
                name: "C",
            },
            children: [
                {
                    path: "/A/C/F",
                    data: {
                        key: "subsubtype",
                        value: "f",
                        name: "F",
                    },
                },
                {
                    path: "/A/C/G",
                    data: {
                        key: "subsubtype",
                        value: "g",
                        name: "G",
                    },
                },
            ],
            staticOptions: [
                {
                    key: "staticC",
                    values: ["static_c"],
                },
            ],
        },
    ],
    staticOptions: [
        {
            key: "staticA1",
            values: ["static_a1"],
            namesMap: {
                static_a1: "Static A1",
            },
        },
        {
            key: "staticA2",
            values: [true],
        },
    ],
};

export const UNEVEN_TREE = {
    path: "/A",
    data: { key: "type", value: "a", name: "A" },
    children: [
        {
            path: "/A/B",
            data: { key: "subtype", value: "b", name: "B" },
        },
        {
            path: "/A/C",
            data: { key: "subtype", value: "c", name: "C" },
            children: [
                {
                    path: "/A/C/C1",
                    data: { key: "subsubtype", value: "c1", name: "C1" },
                },
                {
                    path: "/A/C/C2",
                    data: { key: "subsubtype", value: "c2", name: "C2" },
                },
            ],
        },
        {
            path: "/A/D",
            data: { key: "subtype", value: "d", name: "D" },
            children: [
                {
                    path: "/A/D/D1",
                    data: { key: "subsubtype", value: "d1", name: "D1" },
                    children: [
                        {
                            path: "/A/D/D1/X",
                            data: { key: "propX", value: "x", name: "X" },
                        },
                    ],
                },
            ],
        },
    ],
};

/**
 * @summary A tree with terminal nodes that feature a `staticOptions` property.
 */
export const TREE_STATIC_TERMINAL = {
    path: "/A",
    data: { key: "type", value: "a", name: "A" },
    children: [
        {
            path: "/A/B",
            data: { key: "subtype", value: "b", name: "B" },
        },
        {
            path: "/A/C",
            data: { key: "subtype", value: "c", name: "C" },
            children: [
                {
                    path: "/A/C/C1",
                    data: { key: "subsubtype", value: "c1", name: "C1" },
                    staticOptions: [{ key: "static", values: ["static1", "static2", "static3"] }],
                },
                {
                    path: "/A/C/C2",
                    data: { key: "subsubtype", value: "c2", name: "C2" },
                },
            ],
        },
    ],
};
