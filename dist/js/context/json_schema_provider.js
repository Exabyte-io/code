"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONSchemaFormDataProvider = void 0;
const underscore_1 = __importDefault(require("underscore"));
const provider_1 = require("./provider");
/**
 * @summary Provides jsonSchema and uiSchema for generating react-jsonschema-form
 *          See https://github.com/mozilla-services/react-jsonschema-form for Form UI.
 *          Form generation example:
 * ```
 * <Form schema={provider.jsonSchema}
 *      uiSchema={provider.uiSchema}
 *      formData={provider.getData(unit.important)} />
 * ```
 */
class JSONSchemaFormDataProvider extends provider_1.ContextProvider {
    constructor(config) {
        super(config);
        this.isUsingJinjaVariables = Boolean(config === null || config === void 0 ? void 0 : config.isUsingJinjaVariables);
    }
    get jsonSchema() {
        throw new Error("Not implemented.");
    }
    get uiSchema() {
        throw new Error("Not implemented.");
    }
    get fields() {
        return {};
    }
    get defaultFieldStyles() {
        return {};
    }
    fieldStyles(classNames) {
        return { classNames };
    }
    get uiSchemaStyled() {
        const schema = this.uiSchema;
        // @ts-ignore
        return underscore_1.default.each(schema, (v, k, l) => {
            l[k] = { ...v, ...this.defaultFieldStyles };
            l[k].classNames = `${v.classNames || ""}`;
            return null;
        });
    }
}
exports.JSONSchemaFormDataProvider = JSONSchemaFormDataProvider;
