import _ from "underscore";

import { ContextProvider } from "./provider";

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
    constructor(config) {
        super(config);
        this.defaultClassNames = "col-xs-12 col-sm-6 col-md-4 col-lg-3";
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
        return _.each(schema, (v, k, l) => {
            l[k] = { ...v, ...this.defaultFieldStyles };
            // retain any prior class attributes
            l[k].classNames = `${v.classNames} ${this.defaultClassNames}`;
        });
    }
}

export { JSONSchemaFormDataProvider };
