Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-expressions */
const chai_1 = require("chai");
const clone_1 = require("../../../src/js/utils/clone");
const url_1 = require("../../../src/js/utils/url");

describe("deepClone", () => {
    const obj = {
        number: 1.0,
        string: "test",
        array: [1.0],
        object: { a: "b" },
    };
    it("clones an object", () => {
        const clone = (0, clone_1.deepClone)(obj);
        (0, chai_1.expect)(clone).to.deep.equal(obj);
        (0, chai_1.expect)(clone);
    });
    it("deep clones", () => {
        const clone = (0, clone_1.deepClone)(obj);
        (0, chai_1.expect)(clone).to.haveOwnProperty("object");
        delete obj.object;
        const other = (0, clone_1.deepClone)(obj);
        (0, chai_1.expect)(other).not.to.haveOwnProperty("object");
    });
});
describe("containsEncodedComponents", () => {
    const decodedComponent = "a test with // special = characters?";
    const encodedComponent = encodeURIComponent(decodedComponent);
    it("identifies whether a string is URL encoded", () => {
        (0, chai_1.expect)((0, url_1.containsEncodedComponents)(encodedComponent)).to.be.true;
        (0, chai_1.expect)((0, url_1.containsEncodedComponents)(decodedComponent)).to.be.false;
    });
});
