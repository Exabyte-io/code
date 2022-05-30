import { expect } from "chai";
import { deepClone } from "./utils/clone";

describe("deepClone", () => {
    const obj = {
        "number": 1.0,
        "string": "test",
        "array": [1.0],
        "object": {"a": "b"},
    }
    it("clones an object", () => {
        const clone = deepClone(obj)
        expect(clone).to.deep.equal(obj)
        expect(clone)
    });
    it("deep clones", () => {
        const clone = deepClone(obj)
        expect(clone).to.haveOwnProperty("object")
        delete obj.object
        const other = deepClone(obj)
        expect(other).not.to.haveOwnProperty("object")
    })
});
