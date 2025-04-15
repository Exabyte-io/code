import { expect } from "chai";

import { RoundingMethodEnum } from "../../src/js/math";
import { RoundedValueWithId, ValueWithId } from "../../src/js/ValueWithId";

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
        const valueWithId = new ValueWithId(testId, testValue);
        expect(valueWithId.id).to.equal(testId);
        expect(valueWithId.value).to.be.equal(testValue);
    });

    it("should convert to JSON format", () => {
        const valueWithId = new ValueWithId(testId, testValue);
        const jsonResult = valueWithId.toJSON();
        expect(jsonResult).to.deep.equal({ id: testId, value: testValue });
    });

    it("should correctly compare equality with primitive values", () => {
        const a = new ValueWithId(testId, testValue);
        const b = new ValueWithId(testId, testValue);
        const c = new ValueWithId(testId, differentValue);

        expect(a.equals(b)).to.equal(true);
        expect(a.equals(c)).to.equal(false);
    });

    it("should correctly compare equality with array values", () => {
        const a = new ValueWithId(testId, [1, 2, 3]);
        const b = new ValueWithId(testId, [1, 2, 3]);
        const c = new ValueWithId(testId, [1, 2, 4]);
        const d = new ValueWithId(testId, [1, 2]);

        expect(a.equals(b)).to.equal(true);
        expect(a.equals(c)).to.equal(false);
        expect(a.equals(d)).to.equal(false);
    });
});

describe("RoundedValueWithId Tests", () => {
    it("should round numeric values with specified precision", () => {
        const value = 1.23456789;
        const id = 1;

        const roundedValueWithId = new RoundedValueWithId(id, value, {
            precision: 3,
            roundingMethod: RoundingMethodEnum.HalfAwayFromZero,
        });
        const result = roundedValueWithId.toJSON() as { id: number; value: number };

        expect(result).to.deep.equal({ id: 1, value: 1.235 });
    });

    it("should round array values with specified precision", () => {
        const value = [1.23456789, 2.34567891, 3.45678912];
        const id = 1;

        const roundedValueWithId = new RoundedValueWithId(id, value, {
            precision: 2,
            roundingMethod: RoundingMethodEnum.HalfAwayFromZero,
        });
        const result = roundedValueWithId.toJSON() as { id: number; value: number[] };

        expect(result).to.deep.equal({ id: 1, value: [1.23, 2.35, 3.46] });
    });

    it("should properly apply bankers rounding when specified", () => {
        // Bankers rounding rounds to the nearest even number when exactly at .5
        const roundToEvenCase1 = new RoundedValueWithId(1, 2.5, {
            precision: 0,
            roundingMethod: RoundingMethodEnum.Bankers,
        });
        const result1 = roundToEvenCase1.toJSON() as { id: number; value: number };
        expect(result1.value).to.equal(2); // Round down to even

        const roundToEvenCase2 = new RoundedValueWithId(1, 3.5, {
            precision: 0,
            roundingMethod: RoundingMethodEnum.Bankers,
        });
        const result2 = roundToEvenCase2.toJSON() as { id: number; value: number };
        expect(result2.value).to.equal(4); // Round up to even
    });
});
