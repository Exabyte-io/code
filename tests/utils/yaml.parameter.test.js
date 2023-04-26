import { assert } from "chai";
import fs from "fs";
import yaml from "js-yaml";

import { parameterType } from "../../src/utils/yaml";

const parameterSchema = yaml.DEFAULT_SCHEMA.extend([parameterType]);

describe("YAML tag !parameter", () => {
    const yamlTestFile = "test.yaml";

    before(() => {
        fs.writeFileSync(yamlTestFile, "job:\n  workflow: [run, stop, pause]\n");
    });

    after(() => {
        fs.unlinkSync(yamlTestFile);
    });

    it("should correctly parse a custom !parameter tag with a key and values", () => {
        const inputYaml = "test: !parameter\n  key: some.key\n  values: [a, b, c]";
        const parsed = yaml.load(inputYaml, { schema: parameterSchema });

        assert.deepEqual(parsed.test, { key: "some.key", values: ["a", "b", "c"] });
    });

    it("should correctly parse a custom !parameter tag with a ref", () => {
        const inputYaml = `test: !parameter\n  key: job.workflow\n  ref: ./${yamlTestFile}#/job.workflow`;
        const parsed = yaml.load(inputYaml, { schema: parameterSchema });

        assert.deepEqual(parsed.test, { key: "job.workflow", values: ["run", "stop", "pause"] });
    });

    it("should correctly parse a custom !parameter tag with a ref and exclude", () => {
        const inputYaml = `test: !parameter\n  key: workflow\n  ref: ./${yamlTestFile}#/job.workflow\n  exclude: run`;
        const parsed = yaml.load(inputYaml, { schema: parameterSchema });

        assert.deepEqual(parsed.test, { key: "workflow", values: ["stop", "pause"] });
    });

    it("should correctly parse a custom !parameter tag with a ref and exclude using a regular expression", () => {
        const inputYaml = `test: !parameter\n  key: job.workflow\n  ref: ./${yamlTestFile}#/job.workflow\n  exclude: (run|pause)`;
        const parsed = yaml.load(inputYaml, { schema: parameterSchema });

        assert.deepEqual(parsed.test, { key: "job.workflow", values: ["stop"] });
    });

    it("should return the original data when an error occurs", () => {
        const inputYaml = "test: !parameter\n  key: error.key\n  ref: non_existent_file.yaml";
        const parsed = yaml.load(inputYaml, { schema: parameterSchema });

        assert.deepEqual(parsed.test, { key: "error.key", ref: "non_existent_file.yaml" });
    });
});
