/* eslint-disable class-methods-use-this */
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
    isUsingJinjaVariables: boolean;

    constructor(config: JSONSchemaFormDataProviderConfig) {
        super(config);
        this.isUsingJinjaVariables = Boolean(config?.isUsingJinjaVariables);
    }

    get jsonSchema() {
        throw new Error("Not implemented.");
    }

    get uiSchema(): UiSchema {
        throw new Error("Not implemented.");
    }

    get fields() {
        return {};
    }

    get defaultFieldStyles() {
        return {};
    }

    get uiSchemaStyled(): UiSchema {
        const schema = this.uiSchema;
        // @ts-ignore
        return _.each<UiSchema>(schema, (v: UiSchema, k: string, l: UiSchema) => {
            l[k] = { ...v, ...this.defaultFieldStyles };
            l[k].classNames = `${v.classNames || ""}`;
            return null;
        });
    }
}

export { JSONSchemaFormDataProvider };
