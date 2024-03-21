Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const utils_1 = require("../../../src/js/utils");

describe("Tree data structure", () => {
    const TREE = {
        path: "/A",
        children: [
            {
                path: "/A/B",
                children: [
                    {
                        path: "/A/B/C",
                    },
                ],
            },
            {
                path: "/A/D",
            },
        ],
    };
    it("map", () => {
        const [mappedTree] = (0, utils_1.mapTree)([TREE], (node) => {
            return { ...node, foo: "bar" };
        });
        (0, chai_1.expect)(mappedTree).to.have.property("foo", "bar");
        // @ts-ignore
        (0, chai_1.expect)(mappedTree.children[0]).to.have.property("foo", "bar");
        // @ts-ignore
        (0, chai_1.expect)(mappedTree.children[0].children[0]).to.have.property("foo", "bar");
        // @ts-ignore
        (0, chai_1.expect)(mappedTree.children[1]).to.have.property("foo", "bar");
    });
});
