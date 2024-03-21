const __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const JSONSchemasInterfaceServer_1 = __importDefault(
    require("@mat3ra/esse/lib/js/esse/JSONSchemasInterfaceServer"),
);
const chai_1 = require("chai");
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
const yaml_1 = require("../../../src/js/utils/yaml");
const enums_1 = require("../enums");

const yamlSchema = js_yaml_1.default.DEFAULT_SCHEMA.extend([yaml_1.esseType]);
describe("YAML tag: !esse", () => {
    let yamlFixture, parsed;
    before(() => {
        JSONSchemasInterfaceServer_1.default.setSchemaFolder(
            path_1.default.join(__dirname, "./../fixtures/json/example"),
        );
        yamlFixture = fs_1.default.readFileSync(enums_1.YAML_ESSE_FILE, "utf8");
        parsed = js_yaml_1.default.load(yamlFixture, { schema: yamlSchema });
    });
    it("should correctly parse a custom !esse tag and return ESSE schema", () => {
        const expected = {
            $id: "core/primitive/scalar",
            $schema: "http://json-schema.org/draft-07/schema#",
            title: "scalar schema",
            type: "object",
            required: ["value"],
            properties: {
                value: {
                    type: "number",
                },
            },
        };
        (0, chai_1.expect)(parsed.case1).to.eql(expected);
    });
    it("should return the original data when an error occurs", () => {
        (0, chai_1.expect)(parsed.case2).to.be.equal("non-existent-schema-id");
    });
    it("should parse a custom !esse tag and return a value from the ESSE schema", () => {
        const expected = ["kbar", "pa"];
        (0, chai_1.expect)(parsed.case3).to.have.deep.members(expected);
    });
    it("should correctly return nested value from esse schema", () => {
        const expected = "array containing values of x Axis";
        (0, chai_1.expect)(parsed.case4).to.be.eql(expected);
    });
    it("should correctly return array item from esse schema", () => {
        const expected = "yDataSeries";
        (0, chai_1.expect)(parsed.case5).to.be.eql(expected);
    });
});
