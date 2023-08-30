import { UiSchema } from "react-jsonschema-form";
import _ from "underscore";

import { ContextProvider, ContextProviderConfig } from "./provider";

interface JSONSchemaFormDataProviderConfig extends ContextProviderConfig {
    isUsingJinjaVariables?: boolean;
}

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
class JSONSchemaFormDataProvider extends ContextProvider {
    defaultClassNames: string;

    isUsingJinjaVariables: boolean;

    constructor(config: JSONSchemaFormDataProviderConfig) {
        super(config);
        this.defaultClassNames = "col-xs-12 col-sm-6 col-md-4 col-lg-3";
        this.isUsingJinjaVariables = Boolean(config?.isUsingJinjaVariables);
    }

    // eslint-disable-next-line class-methods-use-this
    get jsonSchema() {
        throw new Error("Not implemented.");
    }

    // eslint-disable-next-line class-methods-use-this
    get uiSchema(): UiSchema {
        throw new Error("Not implemented.");
    }

    // eslint-disable-next-line class-methods-use-this
    get fields() {
        return {};
    }

    get defaultFieldStyles() {
        return { classNames: this.defaultClassNames };
    }

    fieldStyles(classNames: string, overrideDefault = false): { classNames: string } {
        let names = classNames;
        if (!overrideDefault) names += " " + this.defaultClassNames;
        return { classNames: names };
    }

    get uiSchemaStyled(): UiSchema {
        const schema = this.uiSchema;
        // @ts-ignore
        return _.each<UiSchema>(schema, (v: UiSchema, k: string, l: UiSchema) => {
            l[k] = { ...v, ...this.defaultFieldStyles };
            // @ts-ignore
            l[k].classNames = `${v.classNames || ""} ${this.defaultClassNames || ""}`;
            return null;
        });
    }
}

export { JSONSchemaFormDataProvider };
