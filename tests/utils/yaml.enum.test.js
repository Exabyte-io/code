import { assert } from "chai";
import yaml from "js-yaml";

import { enumType } from "../../src/utils/yaml";

const enumSchema = yaml.DEFAULT_SCHEMA.extend([enumType]);

describe("YAML tag !enum", () => {
    it("should correctly parse a custom !enum tag with a sequence of values", () => {
        const inputYaml = "test: !enum\n  - value1\n  - value2\n  - value3";
        const parsed = yaml.load(inputYaml, { schema: enumSchema });

        assert.deepEqual(parsed.test, { enum: ["value1", "value2", "value3"] });
    });

    it("should correctly parse an empty !enum tag", () => {
        const inputYaml = "test: !enum\n";
        const parsed = yaml.load(inputYaml, { schema: enumSchema });

        assert.deepEqual(parsed.test, { enum: [] });
    });
});
