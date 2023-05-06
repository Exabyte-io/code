import { assert } from "chai";
import fs from "fs";
import yaml from "js-yaml";

import { esseType } from "../../src/utils/yaml";
import { YAML_ESSE_FILE } from "../enums";

const yamlSchema = yaml.DEFAULT_SCHEMA.extend([esseType]);

describe("YAML tag: !esse", () => {
    const yamlFixture = fs.readFileSync(YAML_ESSE_FILE, "utf8");

    it("should correctly parse a custom !esse tag and return ESSE schema", () => {
        const parsed = yaml.load(yamlFixture, { schema: yamlSchema });
        const expected = {
            schemaId: "core/primitive/scalar",
            $schema: "http://json-schema.org/draft-04/schema#",
            title: "scalar schema",
            type: "object",
            required: ["value"],
            properties: {
                value: {
                    type: "number",
                },
            },
        };
        assert.deepEqual(parsed.case1, expected);
    });

    it("should return the original data when an error occurs", () => {
        const parsed = yaml.load(yamlFixture, { schema: yamlSchema });
        assert.deepEqual(parsed.case2, "non-existent-schema-id");
    });

    it("should parse a custom !esse tag and return a value from the ESSE schema", () => {
        const parsed = yaml.load(yamlFixture, { schema: yamlSchema });
        const expected = ["kbar", "pa"];
        assert.deepEqual(parsed.case3, expected);
    });
});
