import { expect } from "chai";
import fs from "fs";
import yaml from "js-yaml";

import { concatStringType } from "../../../src/js/utils/yaml";
import { YAML_CONCAT_STRING_FILE } from "../enums";

const concatStringSchema = yaml.DEFAULT_SCHEMA.extend([concatStringType]);

describe("YAML tag: !concatString", () => {
    const yamlFixture = fs.readFileSync(YAML_CONCAT_STRING_FILE, "utf8");

    it("should concatenate two strings", () => {
        const parsed = yaml.load(yamlFixture, { schema: concatStringSchema }) as { case1: string };
        const expected = "Hello world!";
        expect(parsed.case1).to.be.eql(expected);
    });

    it("should return a string if there is only a single item", () => {
        const parsed = yaml.load(yamlFixture, { schema: concatStringSchema }) as { case2: string };
        const expected = "Hello";
        expect(parsed.case2).to.be.eql(expected);
    });

    it("should return an empty string if the array is empty", () => {
        const parsed = yaml.load(yamlFixture, { schema: concatStringSchema }) as { case3: string };
        const expected = "";
        expect(parsed.case3).to.be.eql(expected);
    });
});
