// @ts-nocheck
import { expect } from "chai";
import fs from "fs";
import yaml from "js-yaml";

import { parameterType } from "../../../src/js/utils/yaml";
// @ts-ignore
import { YAML_PARAMETER_FILE } from "../enums";

const parameterSchema = yaml.DEFAULT_SCHEMA.extend([parameterType]);

describe("YAML tag: !parameter", () => {
    const yamlFixture = fs.readFileSync(YAML_PARAMETER_FILE, "utf8");

    it("should correctly parse a custom !parameter tag with a key and values", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        expect(parsed.case1).to.be.eql({ key: "some.key", values: ["a", "b", "c"] });
    });

    it("should correctly parse a custom !parameter tag with a ref", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        expect(parsed.case2).to.be.eql({ key: "job.workflow", values: ["run", "stop", "pause"] });
    });

    it("should correctly parse a custom !parameter tag with a ref and exclude", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        expect(parsed.case3).to.be.eql({ key: "workflow", values: ["stop", "pause"] });
    });

    it("should correctly parse a custom !parameter tag with a ref and exclude using a regular expression", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        expect(parsed.case4).to.be.eql({ key: "job.workflow", values: ["stop"] });
    });

    it("should return the original data when an error occurs", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        expect(parsed.case5).to.be.eql({ key: "error.key", ref: "non_existent_file.yaml" });
    });

    it("should add null to values array when isOptional is true", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        expect(parsed.case6).to.be.eql({ key: "some.key", values: ["a", "b", "c", null] });
    });

    it("should exclude values using regex and add null for optional parameters", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        expect(parsed.case7).to.be.eql({ key: "some.key", values: ["a", "c", null] });
    });

    it("should merge values with locally defined items and arrays", () => {
        const parsed = yaml.load(yamlFixture, { schema: parameterSchema });
        expect(parsed.case8).to.be.eql({ key: "merged", values: ["a", "b", "c", "d", "e"] });
    });
});
