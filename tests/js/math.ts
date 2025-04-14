import { expect } from "chai";

import { math, RoundingMethodEnum } from "../../src/js/math";

describe("Math Tests", () => {
    it("should roundCustom according to specified method", () => {
        const values = [0.5, 1.5, -0.5, -1.5];
        const expectedBankers = [0, 2, 0, -2];
        const expectedHalfAwayFromZero = [1, 2, -1, -2];
        const n = 0;

        expectedBankers.forEach((expected, i) => {
            const result = math.roundCustom(values[i], n, RoundingMethodEnum.Bankers);
            expect(result).to.equal(expected);
        });
        expectedHalfAwayFromZero.forEach((expected, i) => {
            const result = math.roundCustom(values[i], n, RoundingMethodEnum.HalfAwayFromZero);
            expect(result).to.equal(expected);
        });
    });

    it("should calculate vector length", () => {
        const vector = [3, 4, 0];
        const expectedLength = 5;
        expect(math.vlen(vector)).to.equal(expectedLength);
    });

    it("should calculate angle between vectors", () => {
        const vectorA = [1, 0, 0];
        const vectorB = [0, 1, 0];
        const expectedAngle = 90;
        expect(math.angle(vectorA, vectorB, "deg")).to.equal(expectedAngle);
    });

    it("should calculate distance between vectors", () => {
        const vectorA = [1, 2, 3];
        const vectorB = [4, 5, 6];
        const expectedDistance = 5.196152422706632;
        expect(math.vDist(vectorA, vectorB)).to.equal(expectedDistance);
    });

    it("should check if vectors are equal within tolerance", () => {
        const vectorA = [1, 2, 3];
        const vectorB = [1.0001, 2.0001, 3.0001];
        const tolerance = 0.001;
        expect(math.vEqualWithTolerance(vectorA, vectorB, tolerance)).to.equal(true);
    });

    it("should check if vectors are not equal within tolerance", () => {
        const vectorA = [1, 2, 3];
        const vectorB = [1.1, 2.1, 3.1];
        const tolerance = 0.001;
        expect(math.vEqualWithTolerance(vectorA, vectorB, tolerance)).to.equal(false);
    });
});
