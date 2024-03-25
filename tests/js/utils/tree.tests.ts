import { expect } from "chai";

import { mapTree } from "../../../src/js/utils";

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
        const [mappedTree] = mapTree([TREE], (node: typeof TREE) => {
            return { ...node, foo: "bar" };
        });
        expect(mappedTree).to.have.property("foo", "bar");
        // @ts-ignore
        expect(mappedTree.children[0]).to.have.property("foo", "bar");
        // @ts-ignore
        expect(mappedTree.children[0].children[0]).to.have.property("foo", "bar");
        // @ts-ignore
        expect(mappedTree.children[1]).to.have.property("foo", "bar");
    });
});
