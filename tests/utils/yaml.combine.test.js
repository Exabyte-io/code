import { assert } from "chai";
import yaml from "js-yaml";

import { combineType } from "../../src/utils/yaml"; // Replace with your actual file

const combineSchema = yaml.DEFAULT_SCHEMA.extend([combineType]);

describe("YAML tag !combine", () => {
    it("should correctly parse a custom !combine tag with forEach and config keys", () => {
        const inputYaml = `
test: !combine
  name: mytest
  forEach:
    - key: a
      values: [1, 2]
    - key: b
      values: [3, 4]
  config:
    c: 5
`;
        const parsed = yaml.load(inputYaml, { schema: combineSchema });
        const expectedResult = [
            { name: "mytest", a: 1, b: 3, c: 5 },
            { name: "mytest", a: 1, b: 4, c: 5 },
            { name: "mytest", a: 2, b: 3, c: 5 },
            { name: "mytest", a: 2, b: 4, c: 5 },
        ];

        assert.deepEqual(parsed.test, expectedResult);
    });

    it("should correctly parse a custom !combine tag with only a name key", () => {
        const inputYaml = `
test: !combine
  name: mytest
`;
        const parsed = yaml.load(inputYaml, { schema: combineSchema });
        const expectedResult = [{ name: "mytest" }];

        assert.deepEqual(parsed.test, expectedResult);
    });

    it("should correctly parse a custom !combine tag with forEach key and no values", () => {
        const inputYaml = `
test: !combine
  name: mytest
  forEach:
    - key: a
    - key: b
`;
        const parsed = yaml.load(inputYaml, { schema: combineSchema });
        // const expectedResult = [{ name: "mytest", a: undefined, b: undefined }];
        const expectedResult = [{ name: "mytest" }];

        assert.deepEqual(parsed.test, expectedResult);
    });

    it("should correctly parse a custom !combine tag with an empty forEach key and a config key", () => {
        const inputYaml = `
test: !combine
  name: mytest
  forEach: []
  config:
    c: 5
`;
        const parsed = yaml.load(inputYaml, { schema: combineSchema });
        const expectedResult = [{ name: "mytest", c: 5 }];

        assert.deepEqual(parsed.test, expectedResult);
    });
});
