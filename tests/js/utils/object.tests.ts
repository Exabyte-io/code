import { expect } from "chai";

import { flattenObject, mergeTerminalNodes } from "../../../src/js/utils/object";

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

describe("mergeTerminalNodes", () => {
    it("merges terminal nodes containing an array of strings", () => {
        const treeStrings = {
            level1: {
                level2a: {
                    level3a: {
                        key1: ["a", "b", "c"],
                    },
                    level3b: {
                        key2: ["d", "e", "f"],
                    },
                },
            },
        };
        const merged = mergeTerminalNodes(treeStrings);
        expect(merged).to.have.members(["a", "b", "c", "d", "e", "f"]);
    });

    it("merges terminal nodes containing an array of objects", () => {
        const treeObjects = {
            level1: {
                level2a: {
                    level3a: {
                        key1: [{ path: "a" }, { path: "b" }, { path: "c" }],
                    },
                    level3b: {
                        key2: [{ path: "d" }, { path: "e" }, { path: "f" }],
                    },
                },
            },
        };
        const merged = mergeTerminalNodes(treeObjects);
        expect(merged).to.have.length(6);
        expect(merged.map((o) => o.path)).to.have.members(["a", "b", "c", "d", "e", "f"]);
    });

    it("should only merge objects", () => {
        const array = [{ path: "a" }, { path: "b" }, { path: "c" }];
        // @ts-ignore
        const merged = mergeTerminalNodes(array);
        expect(merged).to.have.deep.members(array);
    });
});
