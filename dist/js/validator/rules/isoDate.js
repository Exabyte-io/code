"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addIsoDateKeyword;
function addIsoDateKeyword(ajv) {
    ajv.addKeyword({
        keyword: "isoDate",
        type: "string",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(_schema, data, _parentSchema, dataCxt) {
            if (data === null || typeof data === "undefined") {
                return true;
            }
            if (typeof data !== "string") {
                return false;
            }
            const isValid = !Number.isNaN(Date.parse(data));
            if (isValid && dataCxt) {
                dataCxt.parentData[dataCxt.parentDataProperty] = new Date(data);
            }
            return isValid;
        },
        errors: false,
        modifying: true,
        metaSchema: {
            type: "boolean",
        },
    });
}
