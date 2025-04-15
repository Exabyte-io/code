import { expect } from "chai";

import { ArrayWithIds, RoundedArrayWithIds } from "../../src/js/ArrayWithIds";
import { RoundingMethodEnum } from "../../src/js/math";
import { ValueWithId } from "../../src/js/ValueWithId";

const NUMBERS = [1, 2, 3, 4, 5];
const STRINGS = ["value1", "value2", "value3", "value4", "value5"];

const OBJECTS_WITH_IDS = [
    { id: 10, value: "value1" },
    { id: 20, value: "value2" },
    { id: 30, value: "value3" },
];

const ARRAY_VALUES = [
    [1, 2],
    [3, 4],
    [5, 6],
];

describe("ArrayWithIds Tests", () => {
    it("should create from values with sequential IDs", () => {
        const arrayWithIds = ArrayWithIds.fromValues(NUMBERS.slice(0, 3));
        expect(arrayWithIds.values).to.deep.equal([1, 2, 3]);
        expect(arrayWithIds.ids).to.deep.equal([0, 1, 2]);
    });

    it("should create from objects with id and value properties", () => {
        const arrayWithIds = ArrayWithIds.fromObjects(OBJECTS_WITH_IDS);
        expect(arrayWithIds.values).to.deep.equal(["value1", "value2", "value3"]);
        expect(arrayWithIds.ids).to.deep.equal([10, 20, 30]);
    });

    it("should convert to JSON format", () => {
        const arrayWithIds = ArrayWithIds.fromObjects(OBJECTS_WITH_IDS);
        expect(arrayWithIds.toJSON()).to.deep.equal(OBJECTS_WITH_IDS);
    });

    it("should get element value by index", () => {
        const arrayWithIds = ArrayWithIds.fromValues(STRINGS.slice(0, 3));
        expect(arrayWithIds.getElementValueByIndex(1)).to.equal("value2");
        expect(arrayWithIds.getElementValueByIndex(10)).to.equal(undefined);
    });

    it("should get element ID by value", () => {
        const arrayWithIds = ArrayWithIds.fromValues(STRINGS.slice(0, 3));
        expect(arrayWithIds.getElementIdByValue("value3")).to.equal(2);
        expect(arrayWithIds.getElementIdByValue("valueX")).to.equal(undefined);
    });

    it("should filter by values", () => {
        const arrayWithIds = ArrayWithIds.fromValues(ARRAY_VALUES);
        const filterValues = [
            [1, 2],
            [5, 6],
        ];
        arrayWithIds.filterByValues(filterValues);
        expect(arrayWithIds.values).to.deep.equal(filterValues);
        expect(arrayWithIds.ids).to.deep.equal([0, 2]);
    });

    it("should filter by indices", () => {
        const arrayWithIds = ArrayWithIds.fromValues(NUMBERS);
        arrayWithIds.filterByIndices([1, 3]);
        expect(arrayWithIds.values).to.deep.equal([2, 4]);
        expect(arrayWithIds.ids).to.deep.equal([1, 3]);
    });

    it("should filter by IDs", () => {
        const arrayWithIds = ArrayWithIds.fromValues(STRINGS);
        arrayWithIds.filterByIds([0, 2, 4]);
        expect(arrayWithIds.values).to.deep.equal(["value1", "value3", "value5"]);
        expect(arrayWithIds.ids).to.deep.equal([0, 2, 4]);
    });

    it("should map array in-place", () => {
        const arrayWithIds = ArrayWithIds.fromValues(STRINGS.slice(0, 3));
        arrayWithIds.mapArrayInPlace((v) => v.toUpperCase());
        expect(arrayWithIds.values).to.deep.equal(["VALUE1", "VALUE2", "VALUE3"]);
    });

    it("should add items with auto-incrementing IDs", () => {
        const arrayWithIds = ArrayWithIds.fromValues(STRINGS.slice(0, 3));
        arrayWithIds.addItem("value4");
        expect(arrayWithIds.values).to.deep.equal(["value1", "value2", "value3", "value4"]);
        expect(arrayWithIds.ids).to.deep.equal([0, 1, 2, 3]);
    });

    it("should add items with specified IDs", () => {
        const arrayWithIds = ArrayWithIds.fromValues(STRINGS.slice(0, 3));
        arrayWithIds.addItem("value4", 99);
        expect(arrayWithIds.values).to.deep.equal(["value1", "value2", "value3", "value4"]);
        expect(arrayWithIds.ids).to.deep.equal([0, 1, 2, 99]);
    });

    it("should remove item by index", () => {
        const arrayWithIds = ArrayWithIds.fromValues(STRINGS.slice(0, 3));
        arrayWithIds.removeItem(1);
        expect(arrayWithIds.values).to.deep.equal(["value1", "value3"]);
        expect(arrayWithIds.ids).to.deep.equal([0, 2]);
    });

    it("should remove item by ID", () => {
        const arrayWithIds = ArrayWithIds.fromValues(STRINGS.slice(0, 3));
        arrayWithIds.removeItem(0, 1);
        expect(arrayWithIds.values).to.deep.equal(["value1", "value3"]);
        expect(arrayWithIds.ids).to.deep.equal([0, 2]);
    });

    it("should throw error when removing by non-existent ID", () => {
        const arrayWithIds = ArrayWithIds.fromValues(STRINGS.slice(0, 3));
        expect(() => arrayWithIds.removeItem(0, 99)).to.throw("ID not found");
    });

    it("should throw error when removing by out-of-range index", () => {
        const arrayWithIds = ArrayWithIds.fromValues(STRINGS.slice(0, 3));
        expect(() => arrayWithIds.removeItem(99)).to.throw("Index out of range");
    });

    it("should correctly compare equality", () => {
        const a = ArrayWithIds.fromValues(NUMBERS.slice(0, 3));
        const b = ArrayWithIds.fromValues(NUMBERS.slice(0, 3));
        const c = ArrayWithIds.fromValues([1, 2, 4]);

        expect(a.equals(b)).to.equal(true);
        expect(a.equals(c)).to.equal(false);

        const d = new ArrayWithIds([1, 2, 3], [0, 1, 2]);
        expect(a.equals(d)).to.equal(true);

        const e = new ArrayWithIds([1, 2, 3], [10, 20, 30]);
        expect(a.equals(e)).to.equal(false);
    });

    it("should convert to array of ValueWithId objects", () => {
        const arrayWithIds = ArrayWithIds.fromValues(NUMBERS.slice(0, 3));
        const valueWithIdArray = arrayWithIds.toValueWithIdArray();

        expect(valueWithIdArray.length).to.equal(3);
        expect(valueWithIdArray[0]).to.be.instanceOf(ValueWithId);
        expect(valueWithIdArray[0].id).to.equal(0);
        expect(valueWithIdArray[0].value).to.equal(1);
    });
});

describe("RoundedArrayWithIds Tests", () => {
    it("should round values when converting to JSON", () => {
        const values = [1.23456789, 2.34567891, 3.45678912];
        const ids = [1, 2, 3];

        const roundedArray = new RoundedArrayWithIds(values, ids, {
            precision: 2,
            roundingMethod: RoundingMethodEnum.HalfAwayFromZero,
        });

        const result = roundedArray.toJSON();

        expect(result).to.deep.equal([
            { id: 1, value: 1.23 },
            { id: 2, value: 2.35 },
            { id: 3, value: 3.46 },
        ]);
    });

    it("should round array values when converting to JSON", () => {
        const values = [
            [1.23456789, 4.56789123],
            [2.34567891, 5.67891234],
        ];
        const ids = [1, 2];

        const roundedArray = new RoundedArrayWithIds(values, ids, {
            precision: 2,
            roundingMethod: RoundingMethodEnum.HalfAwayFromZero,
        });

        const result = roundedArray.toJSON();

        expect(result).to.deep.equal([
            { id: 1, value: [1.23, 4.57] },
            { id: 2, value: [2.35, 5.68] },
        ]);
    });

    it("should inherit methods from ArrayWithIds", () => {
        const values = [1.23, 2.34, 3.45];
        const ids = [1, 2, 3];

        const roundedArray = new RoundedArrayWithIds(values, ids);

        roundedArray.filterByIds([1, 3]);
        expect(roundedArray.values).to.deep.equal([1.23, 3.45]);
        expect(roundedArray.ids).to.deep.equal([1, 3]);

        const arrayWithIds = new ArrayWithIds([1.23, 3.45], [1, 3]);
        expect(roundedArray.equals(arrayWithIds)).to.be.true;
    });
});
