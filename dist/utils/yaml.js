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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsYamlAllSchemas = exports.JsYamlTypes = exports.concatStringType = exports.readFileType = exports.flattenType = exports.listToStringType = exports.includeType = exports.esseType = exports.combineType = exports.parameterType = void 0;
// @ts-nocheck
// TODO: remove ts-nocheck
const JSONSchemasInterfaceServer_1 = __importDefault(require("@mat3ra/esse/lib/js/esse/JSONSchemasInterfaceServer"));
const fs = __importStar(require("fs"));
const yaml = __importStar(require("js-yaml"));
const lodash = __importStar(require("lodash"));
const path = __importStar(require("path"));
const array_1 = require("./array");
const str_1 = require("./str");
/**
 * Generate objects with combinations of parameters.
 * @param {[{key: string, values: Array}]} parameterSets - Array of parameter objects
 * @param {[[string, string]]} exclusions - Array of pairs of keys which should be excluded
 * @return {Object[]} - Array of objects containing combinations of parameters
 * @example
 * generateCombinations([{key: "a", values: [1, 2]},{key: "b", values: [3, null]}]);
 * // [{ a: 1 }, { a: 2 }, { a: 1, b: 3 }, { a: 2, b: 3 }]
 */
function generateCombinations(parameterSets, exclusions = []) {
    const [head, ...rest] = parameterSets.filter((pObj) => { var _a; return pObj.key && ((_a = pObj.values) === null || _a === void 0 ? void 0 : _a.length); });
    if (!head) {
        return [{}];
    }
    const restCombinations = generateCombinations(rest);
    const { key, values, action = "set" } = head;
    let newCombinations = values.reduce((combs, value) => {
        const valueCombinations = restCombinations.map((combination) => {
            const newCombination = lodash.cloneDeep(combination);
            if (value !== null && action === "set") {
                lodash.set(newCombination, key, value);
            }
            else if (value !== null && action === "push") {
                const arr = lodash.get(newCombination, key);
                if (Array.isArray(arr)) {
                    arr.push(lodash.cloneDeep(value));
                }
                else {
                    lodash.set(newCombination, key, [value]);
                }
            }
            return newCombination;
        });
        return [...combs, ...valueCombinations];
    }, []);
    // Filter out unwanted combinations
    newCombinations = newCombinations.filter((combination) => {
        return !exclusions.some(([k1, k2]) => lodash.has(combination, k1) && lodash.has(combination, k2));
    });
    return newCombinations;
}
/**
 * Utility function splitting a reference such as `"/path/to/source.yml#/name/lastName"`
 * into the file path (`/path/to/source.yml`) and object path (`name.lastName`) compatible with lodash.get().
 * @param {string} ref - Reference to file with optional object path suffix
 * @return {{ objPath: string, filePath: string }}
 */
function splitReference(ref) {
    const filePath = ref.replace(/#.*$/, "");
    const objPath = ref.replace(/^(.*?)(?:#\/|$)/, "").replace(/\//g, ".");
    return { filePath, objPath };
}
/**
 * Resolve path to YAML and return containing value if available.
 * A specific key in the referenced YAML file can be specified via `#/keyName`,
 * e.g. `"/path/to/source.yml#/name"`.
 * @param {string} ref - path to YAML file (may specify key via `#/`)
 */
function readFromYaml(ref) {
    const { filePath, objPath } = splitReference(ref);
    const fileContent = fs.readFileSync(path.resolve(filePath), "utf8");
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    const parsedContent = yaml.load(fileContent, { schema: exports.JsYamlAllSchemas });
    return objPath ? lodash.get(parsedContent, objPath) : parsedContent;
}
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
exports.parameterType = new yaml.Type("!parameter", {
    kind: "mapping",
    construct(data) {
        const { key, values = [], ref, exclude, isOptional = false, merge = [], ...otherProps } = data;
        try {
            let values_ = ref && !values.length ? readFromYaml(ref) : values;
            values_ = (0, array_1.safeMakeArray)(values_);
            if (Array.isArray(merge)) {
                values_ = values_.concat(merge.flat());
            }
            if (exclude) {
                const regex = new RegExp(exclude);
                values_ = values_.filter((v) => !regex.test(v));
            }
            if (isOptional)
                values_.push(null);
            return { key, values: values_, ...otherProps };
        }
        catch (e) {
            return data;
        }
    },
});
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
exports.combineType = new yaml.Type("!combine", {
    kind: "mapping",
    construct(data) {
        const { name, forEach = [], exclusions, config = {}, extraConfigs = [] } = data;
        const combinations = generateCombinations(forEach, exclusions);
        const configs = combinations.map((c) => lodash.merge(c, config));
        configs.forEach((c) => (c.name = (0, str_1.renderTextWithSubstitutes)((name === null || name === void 0 ? void 0 : name.template) || name, c, name === null || name === void 0 ? void 0 : name.substitutions)));
        return extraConfigs.length ? configs.concat(extraConfigs.flat()) : configs;
    },
});
/**
 * !esse YAML tag which resolves an ESSE schema by id.
 * See the tests for example usage.
 */
exports.esseType = new yaml.Type("!esse", {
    kind: "scalar",
    resolve(data) {
        return data && lodash.isString(data);
    },
    construct(data) {
        try {
            const { filePath: schemaId, objPath } = splitReference(data);
            const schema = JSONSchemasInterfaceServer_1.default.getSchemaById(schemaId);
            if (objPath) {
                return lodash.get(schema, objPath);
            }
            return schema || data;
        }
        catch (e) {
            return data;
        }
    },
});
/**
 * !include YAML tag which includes another Yaml file in-place.
 * See the tests for example usage.
 */
exports.includeType = new yaml.Type("!include", {
    kind: "scalar",
    construct(data) {
        try {
            return readFromYaml(data);
        }
        catch (e) {
            return data;
        }
    },
});
/**
 * !listToString YAML tag which concatenate each list item into single string value.
 * See the tests for example usage.
 */
exports.listToStringType = new yaml.Type("!listToString", {
    kind: "sequence",
    construct(data) {
        try {
            return data.filter((d) => typeof d === "string").join("");
        }
        catch (e) {
            return data;
        }
    },
});
/**
 * !flatten YAML tag for flattening arrays
 * See the tests for example usage.
 */
exports.flattenType = new yaml.Type("!flatten", {
    kind: "sequence",
    construct(data) {
        try {
            return data.flat();
        }
        catch (e) {
            return data;
        }
    },
});
/**
 * !readFile YAML tag for including file contents as a string.
 * See the tests for example usage.
 */
exports.readFileType = new yaml.Type("!readFile", {
    kind: "scalar",
    construct(data) {
        try {
            return fs.readFileSync(path.resolve(data), "utf8");
        }
        catch (e) {
            return data;
        }
    },
});
/**
 * !concatString YAML tag for concatenating strings.
 * See the tests for example usage.
 */
exports.concatStringType = new yaml.Type("!concatString", {
    kind: "sequence",
    resolve(data) {
        return data.every((d) => lodash.isString(d));
    },
    construct(data) {
        try {
            return "".concat(...data);
        }
        catch (e) {
            return data;
        }
    },
});
exports.JsYamlTypes = {
    include: exports.includeType,
    listToString: exports.listToStringType,
    parameter: exports.parameterType,
    combine: exports.combineType,
    esse: exports.esseType,
    flatten: exports.flattenType,
    readFile: exports.readFileType,
    concatString: exports.concatStringType,
};
exports.JsYamlAllSchemas = yaml.DEFAULT_SCHEMA.extend([
    exports.parameterType,
    exports.combineType,
    exports.esseType,
    exports.includeType,
    exports.listToStringType,
    exports.flattenType,
    exports.readFileType,
    exports.concatStringType,
]);
