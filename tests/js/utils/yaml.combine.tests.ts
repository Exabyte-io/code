/* eslint-disable no-unused-expressions */
// @ts-nocheck
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterfaceServer";
import { expect } from "chai";
import fs from "fs";
import yaml from "js-yaml";
import lodash from "lodash";
import path from "path";

import { combineType, esseType } from "../../../src/js/utils/yaml";
import { YAML_COMBINE_FILE } from "../enums";

const combineSchema = yaml.DEFAULT_SCHEMA.extend([combineType, esseType]);

describe("YAML tag: !combine", () => {
    let yamlFixture;
    let parsed;

    before(() => {
        JSONSchemasInterface.setSchemaFolder(path.join(__dirname, "./../fixtures/json/example"));
        yamlFixture = fs.readFileSync(YAML_COMBINE_FILE, "utf8");
        parsed = yaml.load(yamlFixture, { schema: combineSchema });
    });

    it("should correctly parse a custom !combine tag with forEach and config keys", () => {
        const expectedResult = [
            { name: "mytest", a: 1, b: 3, c: 5 },
            { name: "mytest", a: 1, b: 4, c: 5 },
            { name: "mytest", a: 2, b: 3, c: 5 },
            { name: "mytest", a: 2, b: 4, c: 5 },
        ];

        expect(parsed.case1).to.have.deep.members(expectedResult);
    });

    it("should correctly parse a custom !combine tag with only a name key", () => {
        const expectedResult = [{ name: "mytest" }];
        expect(parsed.case2).to.have.deep.members(expectedResult);
    });

    it("should correctly parse a custom !combine tag with forEach key and no values", () => {
        const expectedResult = [{ name: "mytest" }];
        expect(parsed.case3).to.have.deep.members(expectedResult);
    });

    it("should correctly parse a custom !combine tag with an empty forEach key and a config key", () => {
        const expectedResult = [{ name: "mytest", c: 5 }];
        expect(parsed.case4).to.have.deep.members(expectedResult);
    });

    it("should correctly generate name based on template", () => {
        const expectedResult = [
            { name: "A1 with B2 and C5", a: 1, b: "two", c: 5 },
            { name: "A1 with B4 and C5", a: 1, b: "four", c: 5 },
        ];
        expect(parsed.case5).to.have.deep.members(expectedResult);
    });

    it("should correctly parse a custom !combine tag with additional property", () => {
        const expectedResult = [
            { name: "mytest", a: 1, b: 3 },
            { name: "mytest", a: 1, b: 4 },
            { name: "additional property", x: 7 },
        ];
        expect(parsed.case6).to.have.deep.members(expectedResult);
    });

    it("should correctly parse a custom !combine tag with additional property from !combine tag", () => {
        const expectedResult = [
            { name: "mytest", a: 1, b: 3 },
            { name: "mytest", a: 1, b: 4 },
            { name: "additional property", x: 7, y: 9 },
            { name: "additional property", x: 8, y: 9 },
        ];
        expect(parsed.case7).to.have.deep.members(expectedResult);
    });

    it("should create an additional config when falsy parameter is provided", () => {
        const expectedResult = [
            { name: "A1 with B2", a: 1, b: "two" },
            { name: "A1 with B4", a: 1, b: "four" },
            { name: "A1", a: 1 },
        ];
        expect(parsed.case8).to.have.deep.members(expectedResult);
    });

    it("should create all combinations of n optional parameters", () => {
        const expectedResult = [
            { name: "optional params", a: 1 },
            { name: "optional params", a: 1, b: 2 },
            { name: "optional params", a: 1, b: 3 },
            { name: "optional params", a: 1, c: 4 },
            { name: "optional params", a: 1, b: 2, c: 4 },
            { name: "optional params", a: 1, b: 3, c: 4 },
        ];
        expect(parsed.case9).to.have.deep.members(expectedResult);
    });

    it("should allow to exclude certain parameter-specified combinations", () => {
        const expectedResult = [{ name: "ignore test", a: { c: 3 }, d: 4 }];
        expect(parsed.case10).to.have.deep.members(expectedResult);
    });

    it("should use the push action to add value to an array parameter", () => {
        const expectedResult = [
            { name: "push test", units: [{ a: 1 }, { b: 4 }] },
            { name: "push test", units: [{ a: 2 }, { b: 4 }] },
            { name: "push test", units: [{ a: 3 }, { b: 4 }] },
            { name: "push test", units: [{ a: 1 }, { b: 5 }] },
            { name: "push test", units: [{ a: 2 }, { b: 5 }] },
            { name: "push test", units: [{ a: 3 }, { b: 5 }] },
        ];

        // sort units before comparing
        parsed.case11.forEach((c) => (c.units = lodash.sortBy(c.units, ["a", "b"])));
        expectedResult.forEach((c) => (c.units = lodash.sortBy(c.units, ["a", "b"])));

        expect(parsed.case11).to.have.deep.members(expectedResult);
    });

    it("should use cloned objects when pushing to array", () => {
        const [config1, config2] = parsed.case12;

        // deleting property in one should not affect the other
        delete config1.units[1].schema;

        expect(config1.units[1].schema).to.be.undefined;
        expect(config2.units[1].schema).not.to.be.undefined;
    });
});
