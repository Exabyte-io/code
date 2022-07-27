import { expect } from "chai";

import { flattenObject } from "../src/utils/object";

describe("flattenObject", () => {
    it("serializes simple object", () => {
        const obj = {
            value: 1.0,
            name: "p-norm",
            degree: 2,
        };

        const expectedObj = { "p-norm:degree=2": 1 };
        expect(expectedObj).to.deep.equal(flattenObject(obj));
    });

    it("serialize complex object", () => {
        const obj = {
            value: 1.0,
            name: "p-norm",
            extraProp: {
                name: "zeta",
                value: 6,
                extraProp: {
                    name: "alpha",
                    value: 3,
                    veracity: 7,
                },
            },
        };

        const expectedObj = { "p-norm:zeta=6:alpha=3:veracity=7": 1 };
        expect(expectedObj).to.deep.equal(flattenObject(obj));
    });

    it("throws error for wrong object", () => {
        const obj = {
            value: 1.0,
            name: "p-norm",
            degree: 2,
            extraProperty: 1,
        };

        expect(() => {
            flattenObject(obj);
        }).to.throw();
    });
});
