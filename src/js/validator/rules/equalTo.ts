import Ajv from "ajv";

export default function addEqualToFieldKeyword(ajv: Ajv) {
    ajv.addKeyword({
        keyword: "equalToField",
        type: "string", // Applies to string fields
        schemaType: "string", // The schema for this keyword should be a string (field name)
        validate(schema, data, _parentSchema, dataCxt) {
            const otherFieldValue = dataCxt?.parentData[schema];
            return data === otherFieldValue;
        },
        errors: true, // Enable error handling
        error: {
            message: (cxt) => `should be equal to the value of "${cxt.schema}"`,
        },
    });
}
