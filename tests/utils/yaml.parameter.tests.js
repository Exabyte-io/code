import { assert } from "chai";
import fs from "fs";
import yaml from "js-yaml";

import { parameterType } from "../../src/utils/yaml";
import { YAML_PARAMETER_FILE } from "../enums";

const parameterSchema = yaml.DEFAULT_SCHEMA.extend([parameterType]);

describe("YAML tag: !parameter", () => {
    const yamlFixture = fs.readFileSync(YAML_PARAMETER_FILE, "utf8");

    it("should correctly parse a custom !parameter tag with a key and values", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        assert.deepEqual(parsed.case1, { key: "some.key", values: ["a", "b", "c"] });
    });

    it("should correctly parse a custom !parameter tag with a ref", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        assert.deepEqual(parsed.case2, { key: "job.workflow", values: ["run", "stop", "pause"] });
    });

    it("should correctly parse a custom !parameter tag with a ref and exclude", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        assert.deepEqual(parsed.case3, { key: "workflow", values: ["stop", "pause"] });
    });

    it("should correctly parse a custom !parameter tag with a ref and exclude using a regular expression", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        assert.deepEqual(parsed.case4, { key: "job.workflow", values: ["stop"] });
    });

    it("should return the original data when an error occurs", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        assert.deepEqual(parsed.case5, { key: "error.key", ref: "non_existent_file.yaml" });
    });

    it("should add null to values array when isOptional is true", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        assert.deepEqual(parsed.case6, { key: "some.key", values: ["a", "b", "c", null] });
    });
});
