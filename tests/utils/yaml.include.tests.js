import { assert } from "chai";
import fs from "fs";
import yaml from "js-yaml";

import { includeType } from "../../src/utils/yaml";
import { YAML_INCLUDE_FILE } from "../enums";

const includeSchema = yaml.DEFAULT_SCHEMA.extend([includeType]);

describe("YAML tag: !include", () => {
    const yamlFixture = fs.readFileSync(YAML_INCLUDE_FILE, "utf8");

    it("should correctly include content from another Yaml file", () => {
        const parsed = yaml.load(yamlFixture, { schema: includeSchema });
        const expected = {
            here: "original content",
            there: ["run", "stop", "pause"],
        };
        assert.deepEqual(parsed.case1, expected);
    });

    it("should return the original data when an error occurs", () => {
        const parsed = yaml.load(yamlFixture, { schema: includeSchema });
        const expected = {
            here: "original content",
            there: "nonexistent_file.txt",
        };
        assert.deepEqual(parsed.case2, expected);
    });
});
