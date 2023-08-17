// @ts-nocheck
import { expect } from "chai";
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
            $id: "core/primitive/scalar",
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
        expect(parsed.case1).to.eql(expected);
    });

    it("should return the original data when an error occurs", () => {
        const parsed = yaml.load(yamlFixture, { schema: yamlSchema });
        expect(parsed.case2).to.be.equal("non-existent-schema-id");
    });

    it("should parse a custom !esse tag and return a value from the ESSE schema", () => {
        const parsed = yaml.load(yamlFixture, { schema: yamlSchema });
        const expected = ["kbar", "pa"];
        expect(parsed.case3).to.have.deep.members(expected);
    });

    it("should correctly return nested value from esse schema", () => {
        const parsed = yaml.load(yamlFixture, { schema: yamlSchema });
        const expected = "array containing values of x Axis";
        expect(parsed.case4).to.be.eql(expected);
    });
});
