const __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const yaml_1 = require("../../../src/js/utils/yaml");
const enums_1 = require("../enums");

const concatStringSchema = js_yaml_1.default.DEFAULT_SCHEMA.extend([yaml_1.concatStringType]);
describe("YAML tag: !concatString", () => {
    const yamlFixture = fs_1.default.readFileSync(enums_1.YAML_CONCAT_STRING_FILE, "utf8");
    it("should concatenate two strings", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: concatStringSchema });
        const expected = "Hello world!";
        (0, chai_1.expect)(parsed.case1).to.be.eql(expected);
    });
    it("should return a string if there is only a single item", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: concatStringSchema });
        const expected = "Hello";
        (0, chai_1.expect)(parsed.case2).to.be.eql(expected);
    });
    it("should return an empty string if the array is empty", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: concatStringSchema });
        const expected = "";
        (0, chai_1.expect)(parsed.case3).to.be.eql(expected);
    });
});
