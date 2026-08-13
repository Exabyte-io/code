"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addEqualToFieldKeyword;
function addEqualToFieldKeyword(ajv) {
    ajv.addKeyword({
        keyword: "equalToField",
        type: "string", // Applies to string fields
        schemaType: "string", // The schema for this keyword should be a string (field name)
        validate(schema, data, _parentSchema, dataCxt) {
            const otherFieldValue = dataCxt === null || dataCxt === void 0 ? void 0 : dataCxt.parentData[schema];
            return data === otherFieldValue;
        },
        errors: true, // Enable error handling
        error: {
            message: (cxt) => `should be equal to the value of "${cxt.schema}"`,
        },
    });
}
