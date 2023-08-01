import { expect } from "chai";
import fs from "fs";
import yaml from "js-yaml";

import { readStringType } from "../../src/utils/yaml";
import { YAML_READ_STRING_FILE } from "../enums";

const readStringSchema = yaml.DEFAULT_SCHEMA.extend([readStringType]);

describe("YAML tag: !readString", () => {
    const yamlFixture = fs.readFileSync(YAML_READ_STRING_FILE, "utf8");

    it("should read contents of a file into a string", () => {
        const parsed = yaml.load(yamlFixture, { schema: readStringSchema });
        const expected = "Example text\nwith linebreaks.\n";
        expect(parsed.case1).to.be.a("string");
        expect(parsed.case1).to.be.eql(expected);
    });
});
