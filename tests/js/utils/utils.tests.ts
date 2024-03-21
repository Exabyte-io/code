/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import { deepClone } from "../../../src/js/utils/clone";
import { containsEncodedComponents } from "../../../src/js/utils/url";

interface TestObject {
    number: number;
    string: string;
    array: number[];
    object?: { a: string };
}

describe("deepClone", () => {
    const obj: TestObject = {
        number: 1.0,
        string: "test",
        array: [1.0],
        object: { a: "b" },
    };
    it("clones an object", () => {
        const clone = deepClone(obj);
        expect(clone).to.deep.equal(obj);
        expect(clone);
    });
    it("deep clones", () => {
        const clone = deepClone(obj);
        expect(clone).to.haveOwnProperty("object");
        delete obj.object;
        const other = deepClone(obj);
        expect(other).not.to.haveOwnProperty("object");
    });
});

describe("containsEncodedComponents", () => {
    const decodedComponent = "a test with // special = characters?";
    const encodedComponent = encodeURIComponent(decodedComponent);

    it("identifies whether a string is URL encoded", () => {
        expect(containsEncodedComponents(encodedComponent)).to.be.true;
        expect(containsEncodedComponents(decodedComponent)).to.be.false;
    });
});
