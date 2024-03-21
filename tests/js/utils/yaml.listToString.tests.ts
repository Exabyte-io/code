// @ts-nocheck
import { expect } from "chai";
import fs from "fs";
import yaml from "js-yaml";

import { listToStringType } from "../../../src/js/utils/yaml";
import { YAML_LIST_TO_STRING_FILE } from "../enums";

const includeSchema = yaml.DEFAULT_SCHEMA.extend([listToStringType]);

describe("YAML tag: !listToString", () => {
    const yamlFixture = fs.readFileSync(YAML_LIST_TO_STRING_FILE, "utf8");

    it("should correctly concatenate content from list to string", () => {
        const parsed = yaml.load(yamlFixture, { schema: includeSchema });

        const expected = {
            here: "original content",
            there: "onetwo",
        };
        expect(parsed.case1).to.be.eql(expected);
    });

    it("should correctly filter out and concatenate only strings from list", () => {
        const parsed = yaml.load(yamlFixture, { schema: includeSchema });

        const expected = {
            here: "original content",
            there: "onetwo",
        };
        expect(parsed.case2).to.be.eql(expected);
    });
});
