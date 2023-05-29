import { expect } from "chai";

import { isContainedByProperty } from "../../src/utils/array";

describe("array", () => {
    it("can test whether one array is contained within another by property", () => {
        const probe = [
            { name: "A", path: "/path/to/a" },
            { name: "B", path: "/path/to/b" },
        ];
        const reference = [
            { name: "A", path: "/path/to/a", tag: "a1" },
            { name: "B", path: "/path/to/b", tag: "b1" },
            { name: "C", path: "/path/to/c", tag: "c1" },
        ];
        const isContained = isContainedByProperty(probe, reference, "path");
        // eslint-disable-next-line no-unused-expressions
        expect(isContained).to.be.true;
    });
    it("can test whether one array is not contained within another by property", () => {
        const probe = [
            { name: "A", path: "/path/to/a" },
            { name: "B", path: "/path/to/b" },
        ];
        const reference = [
            { name: "A", path: "/path/to/a", tag: "a1" },
            { name: "C", path: "/path/to/c", tag: "c1" },
            { name: "D", path: "/path/to/d", tag: "d1" },
        ];
        const isContained = isContainedByProperty(probe, reference, "path");
        // eslint-disable-next-line no-unused-expressions
        expect(isContained).to.be.false;
    });
});
