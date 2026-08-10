"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addSharedFormatsAndKeywords;
const jsonSchemaToTypescriptKeywords_1 = __importDefault(require("@mat3ra/esse/dist/js/utils/ajvKeywords/jsonSchemaToTypescriptKeywords"));
const equalTo_1 = __importDefault(require("./equalTo"));
const isoDate_1 = __importDefault(require("./isoDate"));
/**
 * Shared AJV formats/keywords for the standalone validator.
 * App-specific formats (password, phone, username, email) are registered by the host.
 */
function addSharedFormatsAndKeywords(ajv) {
    (0, jsonSchemaToTypescriptKeywords_1.default)(ajv);
    (0, equalTo_1.default)(ajv);
    (0, isoDate_1.default)(ajv);
}
