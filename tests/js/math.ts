import { expect } from "chai";

import { math } from "../../src/js/math";

describe("Math Tests", () => {
    it("should round according to specified method", () => {
        const [value1, value2, value3, value4] = [0.5, 1.5, -0.5, -1.5];
        const [expectedBankers1, expectedBankers2, expectedBankers3, expectedBankers4] = [
            0, 2, 0, -2,
        ];
        const [expectedAway1, expectedAway2, expectedAway3, expectedAway4] = [1, 2, -1, -2];
        const n = 0;
        expect(math.roundCustom(value1, n, math.RoundingMethod.Bankers)).to.equal(expectedBankers1);
        expect(math.roundCustom(value2, n, math.RoundingMethod.Bankers)).to.equal(expectedBankers2);
        expect(math.roundCustom(value3, n, math.RoundingMethod.Bankers)).to.equal(expectedBankers3);
        expect(math.roundCustom(value4, n, math.RoundingMethod.Bankers)).to.equal(expectedBankers4);
        expect(math.roundCustom(value1, n, math.RoundingMethod.HalfAwayFromZero)).to.equal(
            expectedAway1,
        );
        expect(math.roundCustom(value2, n, math.RoundingMethod.HalfAwayFromZero)).to.equal(
            expectedAway2,
        );
        expect(math.roundCustom(value3, n, math.RoundingMethod.HalfAwayFromZero)).to.equal(
            expectedAway3,
        );
        expect(math.roundCustom(value4, n, math.RoundingMethod.HalfAwayFromZero)).to.equal(
            expectedAway4,
        );
    });
});
