import * as yaml from "js-yaml";
/**
 * !parameter YAML tag, which creates an object containing
 *   `key`, the name of or path to the parameter and
 *   `values`, an array of values.
 * Supports YAML objects with the following keys:
 *   - `key`: name or path of parameter, e.g. `job.workflow`
 *   - `values`: list of values (use either `ref` or `values`)
 *   - `ref`: reference to values in another YAML file.
 *   - `exclude`: regular expression for excluding items.
 *   - `isOptional`: whether parameter is optional (adds `null` to values array)
 *   - `merge`: arrays or values from other sources to merge
 * See the tests for example usage.
 */
export declare const parameterType: yaml.Type;
/**
 * !combine YAML tag which creates combinations of objects (configs).
 * The YAML object expects the following keys:
 *   - name: `name` property of object
 *   - name.template: nunjucks template for name (optional)
 *   - name.substitutions: in-place substitutions for template variables (optional)
 *   - forEach: list of parameter objects (defining key and value, see above) which is used to create combinations
 *   - forEach.key: object path to key
 *   - forEach.values: list of values
 *   - forEach.ignoreWith: list of keys for which combination with current key should be ignored
 *   - config: static config to be added to every object
 *   - extraConfigs: sequence of additional configs
 * See the tests for example usage.
 */
export declare const combineType: yaml.Type;
/**
 * !esse YAML tag which resolves an ESSE schema by id.
 * See the tests for example usage.
 */
export declare const esseType: yaml.Type;
/**
 * !include YAML tag which includes another Yaml file in-place.
 * See the tests for example usage.
 */
export declare const includeType: yaml.Type;
/**
 * !listToString YAML tag which concatenate each list item into single string value.
 * See the tests for example usage.
 */
export declare const listToStringType: yaml.Type;
/**
 * !flatten YAML tag for flattening arrays
 * See the tests for example usage.
 */
export declare const flattenType: yaml.Type;
/**
 * !readFile YAML tag for including file contents as a string.
 * See the tests for example usage.
 */
export declare const readFileType: yaml.Type;
/**
 * !concatString YAML tag for concatenating strings.
 * See the tests for example usage.
 */
export declare const concatStringType: yaml.Type;
export declare const JsYamlTypes: {
    include: yaml.Type;
    listToString: yaml.Type;
    parameter: yaml.Type;
    combine: yaml.Type;
    esse: yaml.Type;
    flatten: yaml.Type;
    readFile: yaml.Type;
    concatString: yaml.Type;
};
export declare const JsYamlAllSchemas: yaml.Schema;
