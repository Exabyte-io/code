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

const includeSchema = js_yaml_1.default.DEFAULT_SCHEMA.extend([yaml_1.includeType]);
describe("YAML tag: !include", () => {
    const yamlFixture = fs_1.default.readFileSync(enums_1.YAML_INCLUDE_FILE, "utf8");
    it("should correctly include content from another Yaml file", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: includeSchema });
        const expected = {
            here: "original content",
            there: ["run", "stop", "pause"],
        };
        (0, chai_1.expect)(parsed.case1).to.be.eql(expected);
    });
    it("should return the original data when an error occurs", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: includeSchema });
        const expected = {
            here: "original content",
            there: "nonexistent_file.txt",
        };
        (0, chai_1.expect)(parsed.case2).to.be.eql(expected);
    });
});
