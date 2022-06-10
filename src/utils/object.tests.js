import { expect } from "chai";
import { flattenObject } from "./object";

describe("flattenObject", function() {
    it("serializes simple object", function() {

        const obj = {
            "value": 1.0,
            "name": "p-norm",
            "degree": 2,
        };

        const expectedObj = { "p-norm:degree=2": 1 };
        expect(expectedObj).to.deep.equal(flattenObject(obj));

    });

    it("serialize complex object", function() {
        const obj = {
            "value": 1.0,
            "name": "p-norm",
            "extraProp": {
                "name": "zeta",
                "value": 6,
                "extraProp": {
                    "name": "alpha",
                    "value": 3,
                    "veracity": 7,
                },
            },
        };

        const expectedObj = { "p-norm:zeta=6:alpha=3:veracity=7": 1 };
        expect(expectedObj).to.deep.equal(flattenObject(obj));
    });

    it("throws error for wrong object", function() {
        const obj = {
            "value": 1.0,
            "name": "p-norm",
            "degree": 2,
            "extraProperty": 1,
        };

        expect(() => {
            flattenObject(obj);
        }).to.throw();

    });
});
