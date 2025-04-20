import { expect } from "chai";

import { RoundingMethodEnum } from "../../src/js/math";
import { RoundedValueWithId, ValueWithId } from "../../src/js/ValueWithId";

// default constructor values
const DEFAULT_ID = 0;
const DEFAULT_VALUE = null;

// test values for primitives
const TEST_ID = 1;
const TEST_VALUE = "testValue";
const DIFFERENT_VALUE = "differentValue";

// test values for arrays
const ARRAY_VALUE = [1, 2, 3];
const ARRAY_VALUE_EQUAL = [1, 2, 3];
const ARRAY_VALUE_DIFF = [1, 2, 4];
const ARRAY_VALUE_SHORTER = [1, 2];

// rounding input values
const FLOAT_VALUE_TO_ROUND = 1.23456789;
const ARRAY_OF_FLOATS = [1.23456789, 2.34567891, 3.45678912];

// expected results
const ROUNDED_SINGLE_VALUE = 1.235;
const ROUNDED_ARRAY_VALUES = [1.23, 2.35, 3.46];

// bankers rounding edge cases
const VALUE_AT_HALF_TO_EVEN_DOWN = 2.5; // should round to 2
const VALUE_AT_HALF_TO_EVEN_UP = 3.5; // should round to 4
const EXPECTED_EVEN_DOWN = 2;
const EXPECTED_EVEN_UP = 4;

describe("ValueWithId Tests", () => {
    it("should create with default values", () => {
        const valueWithId = new ValueWithId();
        expect(valueWithId.id).to.equal(DEFAULT_ID);
        expect(valueWithId.value).to.be.equal(DEFAULT_VALUE);
    });

    it("should create with specified id and value", () => {
        const valueWithId = ValueWithId.fromValueAndId(TEST_VALUE, TEST_ID);
        expect(valueWithId.id).to.equal(TEST_ID);
        expect(valueWithId.value).to.be.equal(TEST_VALUE);
    });

    it("should convert to JSON format", () => {
        const valueWithId = ValueWithId.fromValueAndId(TEST_VALUE, TEST_ID);
        const jsonResult = valueWithId.toJSON();
        expect(jsonResult).to.deep.equal({ id: TEST_ID, value: TEST_VALUE });
    });

    it("should correctly compare equality with primitive values", () => {
        const a = ValueWithId.fromValueAndId(TEST_VALUE, TEST_ID);
        const b = ValueWithId.fromValueAndId(TEST_VALUE, TEST_ID);
        const c = ValueWithId.fromValueAndId(DIFFERENT_VALUE, TEST_ID);

        expect(a.equals(b)).to.equal(true);
        expect(a.equals(c)).to.equal(false);
    });

    it("should correctly compare equality with array values", () => {
        const a = ValueWithId.fromValueAndId(ARRAY_VALUE, TEST_ID);
        const b = ValueWithId.fromValueAndId(ARRAY_VALUE_EQUAL, TEST_ID);
        const c = ValueWithId.fromValueAndId(ARRAY_VALUE_DIFF, TEST_ID);
        const d = ValueWithId.fromValueAndId(ARRAY_VALUE_SHORTER, TEST_ID);

        expect(a.equals(b)).to.equal(true);
        expect(a.equals(c)).to.equal(false);
        expect(a.equals(d)).to.equal(false);
    });
});

describe("RoundedValueWithId Tests", () => {
    it("should round numeric values with specified precision", () => {
        const roundedValueWithId = new RoundedValueWithId(TEST_ID, FLOAT_VALUE_TO_ROUND, {
            precision: 3,
            roundingMethod: RoundingMethodEnum.HalfAwayFromZero,
        });

        const result = roundedValueWithId.toJSON() as { id: number; value: number };
        expect(result).to.deep.equal({ id: TEST_ID, value: ROUNDED_SINGLE_VALUE });
    });

    it("should round array values with specified precision", () => {
        const roundedValueWithId = new RoundedValueWithId(TEST_ID, ARRAY_OF_FLOATS, {
            precision: 2,
            roundingMethod: RoundingMethodEnum.HalfAwayFromZero,
        });

        const result = roundedValueWithId.toJSON() as { id: number; value: number[] };
        expect(result).to.deep.equal({ id: TEST_ID, value: ROUNDED_ARRAY_VALUES });
    });

    it("should properly apply bankers rounding when specified", () => {
        const roundToEvenCase1 = new RoundedValueWithId(TEST_ID, VALUE_AT_HALF_TO_EVEN_DOWN, {
            precision: 0,
            roundingMethod: RoundingMethodEnum.Bankers,
        });
        const result1 = roundToEvenCase1.toJSON() as { id: number; value: number };
        expect(result1.value).to.equal(EXPECTED_EVEN_DOWN);

        const roundToEvenCase2 = new RoundedValueWithId(TEST_ID, VALUE_AT_HALF_TO_EVEN_UP, {
            precision: 0,
            roundingMethod: RoundingMethodEnum.Bankers,
        });
        const result2 = roundToEvenCase2.toJSON() as { id: number; value: number };
        expect(result2.value).to.equal(EXPECTED_EVEN_UP);
    });
});
