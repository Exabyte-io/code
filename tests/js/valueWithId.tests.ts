import { expect } from "chai";

import { ValueWithId } from "../../src/js/ValueWithId";

const defaultId = 0;
const defaultValue = null;

const testId = 1;
const testValue = "testValue";
const differentValue = "differentValue";

describe("ValueWithId Tests", () => {
    it("should create with default values", () => {
        const valueWithId = new ValueWithId();
        expect(valueWithId.id).to.equal(defaultId);
        expect(valueWithId.value).to.be.equal(defaultValue);
    });

    it("should create with specified id and value", () => {
        const valueWithId = new ValueWithId(testValue, testId);
        expect(valueWithId.id).to.equal(testId);
        expect(valueWithId.value).to.be.equal(testValue);
    });

    it("should convert to JSON format", () => {
        const valueWithId = new ValueWithId(testValue, testId);
        const jsonResult = valueWithId.toJSON();
        expect(jsonResult).to.deep.equal({ id: testId, value: testValue });
    });

    it("should correctly compare equality with primitive values", () => {
        const a = new ValueWithId(testValue, testId);
        const b = new ValueWithId(testValue, testId);
        const c = new ValueWithId(differentValue, testId);

        expect(a.equals(b)).to.equal(true);
        expect(a.equals(c)).to.equal(false);
    });

    it("should correctly compare equality with array values", () => {
        const a = new ValueWithId([1, 2, 3], testId);
        const b = new ValueWithId([1, 2, 3], testId);
        const c = new ValueWithId([1, 2, 4], testId);
        const d = new ValueWithId([1, 2, 3], testId + 1);

        expect(a.equals(b)).to.equal(true);
        expect(a.equals(c)).to.equal(false);
        expect(a.equals(d)).to.equal(false);
    });
});
