import { expect } from "chai";
import fs from "fs";
import yaml from "js-yaml";

import { readFileType } from "../../../src/js/utils/yaml";
// @ts-ignore
import { YAML_READFILE_FILE } from "../enums";

const readFileSchema = yaml.DEFAULT_SCHEMA.extend([readFileType]);

describe("YAML tag: !readFile", () => {
    const yamlFixture = fs.readFileSync(YAML_READFILE_FILE, "utf8");

    it("should read contents of a file into a string", () => {
        const parsed = yaml.load(yamlFixture, { schema: readFileSchema }) as { case1: string };
        const expected = "Example text\nwith linebreaks.\n";
        expect(parsed.case1).to.be.a("string");
        expect(parsed.case1).to.be.eql(expected);
    });
});
