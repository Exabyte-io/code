import fs from "fs";
import yaml from "js-yaml";
import lodash from "lodash";

/**
 * Creates combinations of objects given two arrays of objects.
 * @param {Object[]} a - First list of objects
 * @param {Object[]} b - Second list of objects
 */
function combineKeys(a, b) {
    const combined = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const objA of a) {
        // eslint-disable-next-line no-restricted-syntax
        for (const objB of b) {
            combined.push(lodash.merge({}, objA, objB));
        }
    }
    return combined;
}

/**
 * Resolve path to YAML and return values as an array.
 * A specific key in the referenced YAML file can be specified via `#/keyName`,
 * e.g. `"/path/to/source.yml#/name"`.
 * @param {string} ref - path to YAML file (may specify key via `#/`)
 */
function getValues(ref) {
    const refPath = ref.replace(/#.*$/, "");
    const fileContent = fs.readFileSync(refPath, "utf8");
    // eslint-disable-next-line no-use-before-define
    const parsedContent = yaml.load(fileContent, { schema: allYAMLSchemas });

    const keyName = ref.replace(/.*#\/?/, "");
    const values = lodash.get(parsedContent, keyName);
    return Array.isArray(values) ? values : [values];
}

/**
 * !parameter YAML tag, which creates an object containing
 *   `key`, the name of or path to the parameter and
 *   `values`, an array of values.
 * Supports YAML objects with the following keys:
 *   - `key`: name or path of parameter, e.g. `job.workflow`
 *   - `values`: list of values (use either `ref` or `values`)
 *   - `ref`: reference to values in another YAML file.
 * See the tests for example usage.
 */
export const parameterType = new yaml.Type("!parameter", {
    kind: "mapping",
    construct(data) {
        const { key, values = [], ref, exclude } = data;

        try {
            let values_ = ref && !values.length ? getValues(ref) : values;
            if (exclude) {
                const regex = new RegExp(exclude);
                values_ = values_.filter((v) => !regex.test(v));
            }
            return { key, values: values_ };
        } catch (e) {
            return data;
        }
    },
});

/**
 * !combine YAML tag which creates combinations of objects (configs).
 * The YAML object expects the following keys:
 *   - name: `name` property of object
 *   - forEach: list of parameter objects (defining key and value, see above) which is used to create combinations
 *   - config: static config to be added to every object
 * See the tests for example usage.
 */
export const combineType = new yaml.Type("!combine", {
    kind: "mapping",
    construct(data) {
        const { name, forEach = [], config = {} } = data;
        let result = [{}];
        // eslint-disable-next-line no-restricted-syntax
        for (const item of forEach) {
            const { key, values = [] } = item;
            if (values.length) {
                const newCombinations = values.map((v) => lodash.set({}, key, v));
                result = combineKeys(result, newCombinations);
            }
        }
        return result.map((r) => lodash.merge(r, { name }, config));
    },
});

export const allYAMLSchemas = yaml.DEFAULT_SCHEMA.extend([parameterType, combineType]);
