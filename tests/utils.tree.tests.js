import { expect } from "chai";

import { findTree, mapTree } from "../src/utils";

describe("Tree data structure", () => {
    const TREE = {
        path: "/A",
        children: [
            {
                path: "/A/B",
                children: [
                    {
                        path: "/A/B/C",
                        name: "test",
                    },
                ],
            },
            {
                path: "/A/D",
            },
        ],
    };
    it("map", () => {
        const [mappedTree] = mapTree([TREE], (node) => {
            return { ...node, foo: "bar" };
        });
        expect(mappedTree).to.have.property("foo", "bar");
        expect(mappedTree.children[0]).to.have.property("foo", "bar");
        expect(mappedTree.children[0].children[0]).to.have.property("foo", "bar");
        expect(mappedTree.children[1]).to.have.property("foo", "bar");
    });

    it("find", () => {
        const found = findTree(TREE, (node) => node.path === "/A/B/C");
        expect(found).to.be.an("object");
        expect(found).to.have.property("name", "test");
    });
});
