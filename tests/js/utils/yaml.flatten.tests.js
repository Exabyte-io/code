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

const flattenSchema = js_yaml_1.default.DEFAULT_SCHEMA.extend([yaml_1.flattenType]);
describe("YAML tag: !flatten", () => {
    const yamlFixture = fs_1.default.readFileSync(enums_1.YAML_FLATTEN_FILE, "utf8");
    it("should convert an array of arrays into a flattened array", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: flattenSchema });
        const expected = ["a", "b", "c", "d", "e", "f"];
        (0, chai_1.expect)(parsed.case1).to.be.eql(expected);
    });
});
