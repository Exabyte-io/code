export const MOCK_GLOBAL_SCHEMA = {
    $id: "esse-global-schema",
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Global schema",
    type: "object",
    definitions: {
        "core:primitive:scalar": {
            $id: "core/primitive/scalar",
            $schema: "http://json-schema.org/draft-07/schema#",
            title: "scalar schema",
            type: "object",
            required: ["value"],
            properties: {
                value: {
                    type: "number",
                },
            },
        },
        "definitions:units": {
            $id: "definitions/units",
            pressure: {
                enum: ["kbar", "pa"],
            },
        },
        "core:abstract::d-data": {
            $id: "core/abstract/2d-data",
            $schema: "http://json-schema.org/draft-07/schema#",
            title: "2 dimension data schema",
            type: "object",
            properties: {
                xDataArray: {
                    description: "array containing values of x Axis",
                    type: "array",
                },
                yDataSeries: {
                    $ref: "#/definitions/core:primitive::d-data-series",
                },
            },
            required: ["xDataArray", "yDataSeries"],
        },
        "core:primitive::d-data-series": {
            $id: "core/primitive/1d-data-series",
            $schema: "http://json-schema.org/draft-07/schema#",
            title: "1 dimension data series schema",
            type: "array",
            items: {
                type: "array",
                minItems: 1,
                items: {
                    type: ["number", "string"],
                },
            },
        },
        "methods-directory:physical:pw": {
            $id: "methods-directory/physical/pw",
            $schema: "http://json-schema.org/draft-07/schema#",
            title: "Plane wave method unit schema",
            description: "Approximating the electronic wave function with a plane wave basis",
            type: "object",
            properties: {
                name: {
                    type: "string",
                },
                categories: {
                    properties: {
                        tier1: {
                            description: "top-level category",
                            type: "string",
                        },
                        tier2: {
                            description: "second level category",
                            type: "string",
                        },
                        tier3: {
                            description: "third level category",
                            type: "string",
                        },
                        type: {
                            description: "general type of the entity",
                            type: "string",
                        },
                        subtype: {
                            description: "general subtype of the entity",
                            type: "string",
                        },
                    },
                },
                tags: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
            },
        },
    },
};
