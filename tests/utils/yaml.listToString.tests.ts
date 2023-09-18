// @ts-nocheck
import { expect } from "chai";
import fs from "fs";
import yaml from "js-yaml";

import { includeType } from "../../src/utils/yaml";
import { YAML_INCLUDE_FILE } from "../enums";

const includeSchema = yaml.DEFAULT_SCHEMA.extend([includeType]);

describe.only("YAML tag: !listToString", () => {
    const yamlFixture = fs.readFileSync(YAML_INCLUDE_FILE, "utf8");

    it("should correctly concatenate content from list to string", () => {
        const parsed = yaml.load(yamlFixture, { schema: includeSchema });
        const expected = {
            here: "original content",
            there: ["run", "stop", "pause"],
        };
        expect(parsed.case1).to.be.eql(expected);
    });
});
