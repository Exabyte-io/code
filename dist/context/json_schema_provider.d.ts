import { UiSchema } from "react-jsonschema-form";
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
declare class JSONSchemaFormDataProvider extends ContextProvider {
    defaultClassNames: string;
    isUsingJinjaVariables: boolean;
    constructor(config: JSONSchemaFormDataProviderConfig);
    get jsonSchema(): void;
    get uiSchema(): UiSchema;
    get fields(): {};
    get defaultFieldStyles(): {
        classNames: string;
    };
    fieldStyles(classNames: string, overrideDefault?: boolean): {
        classNames: string;
    };
    get uiSchemaStyled(): UiSchema;
}
export { JSONSchemaFormDataProvider };
