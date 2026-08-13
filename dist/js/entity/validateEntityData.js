"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEntityData = validateEntityData;
const ajv = __importStar(require("@mat3ra/esse/dist/js/utils/ajv"));
const in_memory_1 = require("./in_memory");
/**
 * Validate (and optionally clean) entity data against a JSON schema.
 * Returns `data` unchanged when no schema is provided.
 */
function validateEntityData(data, jsonSchema, options = {}) {
    if (!jsonSchema) {
        return data;
    }
    const { clean = false, coerceTypes = false } = options;
    const result = clean
        ? ajv.validateAndClean(data, jsonSchema, { coerceTypes })
        : ajv.validate(data, jsonSchema);
    if (!result.isValid) {
        throw new in_memory_1.EntityError({
            code: in_memory_1.ValidationErrorCode.IN_MEMORY_ENTITY_DATA_INVALID,
            details: {
                error: result === null || result === void 0 ? void 0 : result.errors,
                json: data,
                schema: jsonSchema,
            },
        });
    }
    return data;
}
