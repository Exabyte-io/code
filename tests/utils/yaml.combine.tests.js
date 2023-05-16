import { assert } from "chai";
import fs from "fs";
import yaml from "js-yaml";

import { combineType } from "../../src/utils/yaml";
import { YAML_COMBINE_FILE } from "../enums";

const combineSchema = yaml.DEFAULT_SCHEMA.extend([combineType]);

describe("YAML tag: !combine", () => {
    const yamlFixture = fs.readFileSync(YAML_COMBINE_FILE, "utf8");
    it("should correctly parse a custom !combine tag with forEach and config keys", () => {
        const parsed = yaml.load(yamlFixture, { schema: combineSchema });
        const expectedResult = [
            { name: "mytest", a: 1, b: 3, c: 5 },
            { name: "mytest", a: 1, b: 4, c: 5 },
            { name: "mytest", a: 2, b: 3, c: 5 },
            { name: "mytest", a: 2, b: 4, c: 5 },
        ];

        assert.deepEqual(parsed.case1, expectedResult);
    });

    it("should correctly parse a custom !combine tag with only a name key", () => {
        const parsed = yaml.load(yamlFixture, { schema: combineSchema });
        const expectedResult = [{ name: "mytest" }];

        assert.deepEqual(parsed.case2, expectedResult);
    });

    it("should correctly parse a custom !combine tag with forEach key and no values", () => {
        const parsed = yaml.load(yamlFixture, { schema: combineSchema });
        // const expectedResult = [{ name: "mytest", a: undefined, b: undefined }];
        const expectedResult = [{ name: "mytest" }];

        assert.deepEqual(parsed.case3, expectedResult);
    });

    it("should correctly parse a custom !combine tag with an empty forEach key and a config key", () => {
        const parsed = yaml.load(yamlFixture, { schema: combineSchema });
        const expectedResult = [{ name: "mytest", c: 5 }];

        assert.deepEqual(parsed.case4, expectedResult);
    });

    it("should correctly parse a custom !combine tag and generate name based on template", () => {
        const parsed = yaml.load(yamlFixture, { schema: combineSchema });
        const expectedResult = [
            { name: "A1 with B2 and C5", a: 1, b: "two", c: 5 },
            { name: "A1 with B4 and C5", a: 1, b: "four", c: 5 },
        ];

        assert.deepEqual(parsed.case5, expectedResult);
    });

    it("should correctly parse a custom !combine tag with additional property", () => {
        const parsed = yaml.load(yamlFixture, { schema: combineSchema });
        const expectedResult = [
            { name: "mytest", a: 1, b: 3 },
            { name: "mytest", a: 1, b: 4 },
            { name: "additional property", x: 7 },
        ];

        assert.deepEqual(parsed.case6, expectedResult);
    });

    it("should correctly parse a custom !combine tag with additional property from !combine tag", () => {
        const parsed = yaml.load(yamlFixture, { schema: combineSchema });
        const expectedResult = [
            { name: "mytest", a: 1, b: 3 },
            { name: "mytest", a: 1, b: 4 },
            { name: "additional property", x: 7, y: 9 },
            { name: "additional property", x: 8, y: 9 },
        ];

        assert.deepEqual(parsed.case7, expectedResult);
    });
});
