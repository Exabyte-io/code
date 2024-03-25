// @ts-nocheck
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterfaceServer";
import { expect } from "chai";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";

import { esseType } from "../../../src/js/utils/yaml";
import { YAML_ESSE_FILE } from "../enums";

const yamlSchema = yaml.DEFAULT_SCHEMA.extend([esseType]);

describe("YAML tag: !esse", () => {
    let yamlFixture;
    let parsed;

    before(() => {
        JSONSchemasInterface.setSchemaFolder(path.join(__dirname, "./../fixtures/json/example"));
        yamlFixture = fs.readFileSync(YAML_ESSE_FILE, "utf8");
        parsed = yaml.load(yamlFixture, { schema: yamlSchema });
    });

    it("should correctly parse a custom !esse tag and return ESSE schema", () => {
        const expected = {
            $id: "core/primitive/scalar",
            $schema: "http://json-schema.org/draft-07/schema#",
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
        expect(parsed.case2).to.be.equal("non-existent-schema-id");
    });

    it("should parse a custom !esse tag and return a value from the ESSE schema", () => {
        const expected = ["kbar", "pa"];
        expect(parsed.case3).to.have.deep.members(expected);
    });

    it("should correctly return nested value from esse schema", () => {
        const expected = "array containing values of x Axis";
        expect(parsed.case4).to.be.eql(expected);
    });

    it("should correctly return array item from esse schema", () => {
        const expected = "yDataSeries";
        expect(parsed.case5).to.be.eql(expected);
    });
});
