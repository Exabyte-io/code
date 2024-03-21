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

const readFileSchema = js_yaml_1.default.DEFAULT_SCHEMA.extend([yaml_1.readFileType]);
describe("YAML tag: !readFile", () => {
    const yamlFixture = fs_1.default.readFileSync(enums_1.YAML_READFILE_FILE, "utf8");
    it("should read contents of a file into a string", () => {
        const parsed = js_yaml_1.default.load(yamlFixture, { schema: readFileSchema });
        const expected = "Example text\nwith linebreaks.\n";
        (0, chai_1.expect)(parsed.case1).to.be.a("string");
        (0, chai_1.expect)(parsed.case1).to.be.eql(expected);
    });
});
