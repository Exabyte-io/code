import { expect } from "chai";

import { ArrayWithIds, RoundedArrayWithIds } from "../../src/js/ArrayWithIds";
import { RoundingMethodEnum } from "../../src/js/math";
import { ValueWithId } from "../../src/js/ValueWithId";

// Base dataset
const NUMBERS = [1, 2, 3, 4, 5];
const STRINGS = ["value1", "value2", "value3", "value4", "value5"];

// Slices and subsets
const FIRST_THREE_NUMBERS = [1, 2, 3];
const FIRST_THREE_STRINGS = ["value1", "value2", "value3"];
const FIRST_THREE_IDS = [0, 1, 2];

// Boundary and error cases
const OUT_OF_RANGE_INDEX = 99;
const NON_EXISTENT_ID = 99;

// Filtering criteria
const INDEX_FILTER = [1, 3];
const ID_FILTER = [0, 2, 4];
const EXPECTED_VALUES_BY_INDEX_FILTER = [2, 4];
const EXPECTED_IDS_BY_INDEX_FILTER = [1, 3];
const EXPECTED_VALUES_BY_ID_FILTER = ["value1", "value3", "value5"];
const EXPECTED_IDS_BY_ID_FILTER = ID_FILTER;

// Additions
const VALUE_TO_ADD = "value4";
const MANUAL_ID_TO_ADD = 99;
const VALUES_AFTER_ADD = STRINGS.slice(0, 4);
const IDS_AFTER_ADD = [0, 1, 2, 3];

// ID+value objects
const EXPECTED_IDS_FROM_OBJECTS = [10, 20, 30];
const OBJECTS_WITH_IDS = [
    { id: 10, value: "value1" },
    { id: 20, value: "value2" },
    { id: 30, value: "value3" },
];

// Nested array values
const ARRAY_VALUES = [
    [1, 2],
    [3, 4],
    [5, 6],
];
const ARRAY_VALUES_TO_KEEP = [
    [1, 2],
    [5, 6],
];
const ARRAY_IDS_TO_KEEP = [0, 2];

// Rounding
const FLOAT_VALUES = [1.23456789, 2.34567891, 3.45678912];
const FLOAT_ARRAYS = [
    [1.23456789, 4.56789123],
    [2.34567891, 5.67891234],
];
const DEFAULT_ROUNDED_IDS = [1, 2, 3];
const ROUNDED_RESULT_2DP = [
    { id: 1, value: 1.23 },
    { id: 2, value: 2.35 },
    { id: 3, value: 3.46 },
];
const ROUNDED_ARRAY_RESULT_2DP = [
    { id: 1, value: [1.23, 4.57] },
    { id: 2, value: [2.35, 5.68] },
];

// Rounding + filtering
const ROUNDED_NUMBERS_EXAMPLE = [1.23, 2.34, 3.45];
const FILTER_IDS_ROUNDED = [1, 3];
const ROUNDED_VALUES_AFTER_FILTER = [1.23, 3.45];
const ROUNDED_IDS_AFTER_FILTER = [1, 3];

describe("ArrayWithIds Tests", () => {
    it("should create from values with sequential IDs", () => {
        const arrayWithIds = ArrayWithIds.fromValues(FIRST_THREE_NUMBERS);
        expect(arrayWithIds.values).to.deep.equal(FIRST_THREE_NUMBERS);
        expect(arrayWithIds.ids).to.deep.equal(FIRST_THREE_IDS);
    });

    it("should create from objects with id and value properties", () => {
        const arrayWithIds = ArrayWithIds.fromObjects(OBJECTS_WITH_IDS);
        expect(arrayWithIds.values).to.deep.equal(FIRST_THREE_STRINGS);
        expect(arrayWithIds.ids).to.deep.equal(EXPECTED_IDS_FROM_OBJECTS);
    });

    it("should convert to JSON format", () => {
        const arrayWithIds = ArrayWithIds.fromObjects(OBJECTS_WITH_IDS);
        expect(arrayWithIds.toJSON()).to.deep.equal(OBJECTS_WITH_IDS);
    });

    it("should get element value by index", () => {
        const arrayWithIds = ArrayWithIds.fromValues(FIRST_THREE_STRINGS);
        expect(arrayWithIds.getElementValueByIndex(1)).to.equal("value2");
        expect(arrayWithIds.getElementValueByIndex(OUT_OF_RANGE_INDEX)).to.equal(undefined);
    });

    it("should get element value by ID", () => {
        const arrayWithIds = ArrayWithIds.fromObjects(OBJECTS_WITH_IDS);
        expect(arrayWithIds.getElementValueById(10)).to.equal("value1");
        expect(arrayWithIds.getElementValueById(NON_EXISTENT_ID)).to.equal(undefined);
    });

    it("should get element ID by index", () => {
        const arrayWithIds = ArrayWithIds.fromObjects(OBJECTS_WITH_IDS);
        expect(arrayWithIds.getElementIdByIndex(0)).to.equal(10);
        expect(arrayWithIds.getElementIdByIndex(OUT_OF_RANGE_INDEX)).to.equal(undefined);
    });

    it("should get element ID by value", () => {
        const arrayWithIds = ArrayWithIds.fromValues(FIRST_THREE_STRINGS);
        expect(arrayWithIds.getElementIdByValue("value3")).to.equal(2);
        expect(arrayWithIds.getElementIdByValue("valueX")).to.equal(undefined);
    });

    it("should filter by values", () => {
        const arrayWithIds = ArrayWithIds.fromValues(ARRAY_VALUES);
        arrayWithIds.filterByValues(ARRAY_VALUES_TO_KEEP);
        expect(arrayWithIds.values).to.deep.equal(ARRAY_VALUES_TO_KEEP);
        expect(arrayWithIds.ids).to.deep.equal(ARRAY_IDS_TO_KEEP);
    });

    it("should filter by indices", () => {
        const arrayWithIds = ArrayWithIds.fromValues(NUMBERS);
        arrayWithIds.filterByIndices(INDEX_FILTER);
        expect(arrayWithIds.values).to.deep.equal(EXPECTED_VALUES_BY_INDEX_FILTER);
        expect(arrayWithIds.ids).to.deep.equal(EXPECTED_IDS_BY_INDEX_FILTER);
    });

    it("should filter by IDs", () => {
        const arrayWithIds = ArrayWithIds.fromValues(STRINGS);
        arrayWithIds.filterByIds(ID_FILTER);
        expect(arrayWithIds.values).to.deep.equal(EXPECTED_VALUES_BY_ID_FILTER);
        expect(arrayWithIds.ids).to.deep.equal(EXPECTED_IDS_BY_ID_FILTER);
    });

    it("should map array in-place", () => {
        const arrayWithIds = ArrayWithIds.fromValues(FIRST_THREE_STRINGS);
        arrayWithIds.mapArrayInPlace((v) => v.toUpperCase());
        expect(arrayWithIds.values).to.deep.equal(["VALUE1", "VALUE2", "VALUE3"]);
    });

    it("should add items with auto-incrementing IDs", () => {
        const arrayWithIds = ArrayWithIds.fromValues(FIRST_THREE_STRINGS);
        arrayWithIds.addItem(VALUE_TO_ADD);
        expect(arrayWithIds.values).to.deep.equal(VALUES_AFTER_ADD);
        expect(arrayWithIds.ids).to.deep.equal(IDS_AFTER_ADD);
    });

    it("should add items with specified IDs", () => {
        const arrayWithIds = ArrayWithIds.fromValues(FIRST_THREE_STRINGS);
        arrayWithIds.addItem(VALUE_TO_ADD, MANUAL_ID_TO_ADD);
        expect(arrayWithIds.values).to.deep.equal([...FIRST_THREE_STRINGS, VALUE_TO_ADD]);
        expect(arrayWithIds.ids).to.deep.equal([0, 1, 2, MANUAL_ID_TO_ADD]);
    });

    it("should remove item by index", () => {
        const arrayWithIds = ArrayWithIds.fromValues(FIRST_THREE_STRINGS);
        arrayWithIds.removeItem(1);
        expect(arrayWithIds.values).to.deep.equal(["value1", "value3"]);
        expect(arrayWithIds.ids).to.deep.equal([0, 2]);
    });

    it("should remove item by ID", () => {
        const arrayWithIds = ArrayWithIds.fromValues(FIRST_THREE_STRINGS);
        arrayWithIds.removeItem(0, 1);
        expect(arrayWithIds.values).to.deep.equal(["value1", "value3"]);
        expect(arrayWithIds.ids).to.deep.equal([0, 2]);
    });

    it("should throw error when removing by non-existent ID", () => {
        const arrayWithIds = ArrayWithIds.fromValues(FIRST_THREE_STRINGS);
        expect(() => arrayWithIds.removeItem(0, NON_EXISTENT_ID)).to.throw("ID not found");
    });

    it("should throw error when removing by out-of-range index", () => {
        const arrayWithIds = ArrayWithIds.fromValues(FIRST_THREE_STRINGS);
        expect(() => arrayWithIds.removeItem(OUT_OF_RANGE_INDEX)).to.throw("Index out of range");
    });

    it("should correctly compare equality", () => {
        const a = ArrayWithIds.fromValues(FIRST_THREE_NUMBERS);
        const b = ArrayWithIds.fromValues(FIRST_THREE_NUMBERS);
        const c = ArrayWithIds.fromValues([1, 2, 4]);
        expect(a.equals(b)).to.equal(true);
        expect(a.equals(c)).to.equal(false);

        const d = new ArrayWithIds([1, 2, 3], [0, 1, 2]);
        expect(a.equals(d)).to.equal(true);

        const e = new ArrayWithIds([1, 2, 3], [10, 20, 30]);
        expect(a.equals(e)).to.equal(false);
    });

    it("should convert to array of ValueWithId objects", () => {
        const arrayWithIds = ArrayWithIds.fromValues(FIRST_THREE_NUMBERS);
        const valueWithIdArray = arrayWithIds.toValueWithIdArray();

        expect(valueWithIdArray.length).to.equal(3);
        expect(valueWithIdArray[0]).to.be.instanceOf(ValueWithId);
        expect(valueWithIdArray[0].id).to.equal(0);
        expect(valueWithIdArray[0].value).to.equal(1);
    });
});

describe("RoundedArrayWithIds Tests", () => {
    it("should round values when converting to JSON", () => {
        const roundedArray = new RoundedArrayWithIds(FLOAT_VALUES, DEFAULT_ROUNDED_IDS, {
            precision: 2,
            roundingMethod: RoundingMethodEnum.HalfAwayFromZero,
        });
        expect(roundedArray.toJSON()).to.deep.equal(ROUNDED_RESULT_2DP);
    });

    it("should round array values when converting to JSON", () => {
        const roundedArray = new RoundedArrayWithIds(FLOAT_ARRAYS, [1, 2], {
            precision: 2,
            roundingMethod: RoundingMethodEnum.HalfAwayFromZero,
        });
        expect(roundedArray.toJSON()).to.deep.equal(ROUNDED_ARRAY_RESULT_2DP);
    });

    it("should inherit methods from ArrayWithIds", () => {
        const roundedArray = new RoundedArrayWithIds(ROUNDED_NUMBERS_EXAMPLE, DEFAULT_ROUNDED_IDS);
        roundedArray.filterByIds(FILTER_IDS_ROUNDED);
        expect(roundedArray.values).to.deep.equal(ROUNDED_VALUES_AFTER_FILTER);
        expect(roundedArray.ids).to.deep.equal(ROUNDED_IDS_AFTER_FILTER);

        const expected = new ArrayWithIds(ROUNDED_VALUES_AFTER_FILTER, ROUNDED_IDS_AFTER_FILTER);
        expect(roundedArray.equals(expected)).to.be.true;
    });
});
