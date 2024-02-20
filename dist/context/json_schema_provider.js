"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
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
        this.defaultClassNames = "col-xs-12 col-sm-6 col-md-4 col-lg-3";
        this.isUsingJinjaVariables = Boolean(
            config === null || config === void 0 ? void 0 : config.isUsingJinjaVariables,
        );
    }
    // eslint-disable-next-line class-methods-use-this
    get jsonSchema() {
        throw new Error("Not implemented.");
    }
    // eslint-disable-next-line class-methods-use-this
    get uiSchema() {
        throw new Error("Not implemented.");
    }
    // eslint-disable-next-line class-methods-use-this
    get fields() {
        return {};
    }
    get defaultFieldStyles() {
        return { classNames: this.defaultClassNames };
    }
    fieldStyles(classNames, overrideDefault = false) {
        let names = classNames;
        if (!overrideDefault) names += " " + this.defaultClassNames;
        return { classNames: names };
    }
    get uiSchemaStyled() {
        const schema = this.uiSchema;
        // @ts-ignore
        return underscore_1.default.each(schema, (v, k, l) => {
            l[k] = { ...v, ...this.defaultFieldStyles };
            // @ts-ignore
            l[k].classNames = `${v.classNames || ""} ${this.defaultClassNames || ""}`;
            return null;
        });
    }
}
exports.JSONSchemaFormDataProvider = JSONSchemaFormDataProvider;
