const __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const chai_1 = require("chai");
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const yaml_1 = require("../../../src/js/utils/yaml");
const enums_1 = require("../enums");

const parameterSchema = js_yaml_1.default.DEFAULT_SCHEMA.extend([yaml_1.parameterType]);
describe("YAML tag: !parameter", () => {
    const yamlFixture = fs_1.default.readFileSync(enums_1.YAML_PARAMETER_FILE, "utf8");
    it("should correctly parse a custom !parameter tag with a key and values", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: parameterSchema });
        (0, chai_1.expect)(parsed.case1).to.be.eql({ key: "some.key", values: ["a", "b", "c"] });
    });
    it("should correctly parse a custom !parameter tag with a ref", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: parameterSchema });
        (0, chai_1.expect)(parsed.case2).to.be.eql({
            key: "job.workflow",
            values: ["run", "stop", "pause"],
        });
    });
    it("should correctly parse a custom !parameter tag with a ref and exclude", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: parameterSchema });
        (0, chai_1.expect)(parsed.case3).to.be.eql({ key: "workflow", values: ["stop", "pause"] });
    });
    it("should correctly parse a custom !parameter tag with a ref and exclude using a regular expression", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: parameterSchema });
        (0, chai_1.expect)(parsed.case4).to.be.eql({ key: "job.workflow", values: ["stop"] });
    });
    it("should return the original data when an error occurs", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: parameterSchema });
        (0, chai_1.expect)(parsed.case5).to.be.eql({
            key: "error.key",
            ref: "non_existent_file.yaml",
        });
    });
    it("should add null to values array when isOptional is true", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: parameterSchema });
        (0, chai_1.expect)(parsed.case6).to.be.eql({
            key: "some.key",
            values: ["a", "b", "c", null],
        });
    });
    it("should exclude values using regex and add null for optional parameters", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: parameterSchema });
        (0, chai_1.expect)(parsed.case7).to.be.eql({ key: "some.key", values: ["a", "c", null] });
    });
    it("should merge values with locally defined items and arrays", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: parameterSchema });
        (0, chai_1.expect)(parsed.case8).to.be.eql({
            key: "merged",
            values: ["a", "b", "c", "d", "e"],
        });
    });
});
