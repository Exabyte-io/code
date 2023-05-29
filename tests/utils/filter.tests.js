import { expect } from "chai";

import { filterEntityList } from "../../src/utils/filter";

describe("entity filter", () => {
    const entities = [
        { name: "A", path: "/root/entity/a" },
        { name: "B", path: "/root/entity/b" },
        { name: "C", path: "/root/entity/c" },
        { name: "D", path: "/root/entity/d" },
    ];

    it("should filter an entity list with paths", () => {
        const filterObjects = [{ path: "/root/entity/b" }, { path: "/root/entity/c" }];
        const filtered = filterEntityList({ filterObjects, entitiesOrPaths: entities });
        const expected = [
            { name: "B", path: "/root/entity/b" },
            { name: "C", path: "/root/entity/c" },
        ];
        expect(filtered).to.have.deep.members(expected);
    });

    it("should filter an entity list with regular expressions", () => {
        const filterObjects = [{ regex: /\/root\/entity\/[bc]/ }];
        const filtered = filterEntityList({ filterObjects, entitiesOrPaths: entities });
        const expected = [
            { name: "B", path: "/root/entity/b" },
            { name: "C", path: "/root/entity/c" },
        ];
        expect(filtered).to.have.deep.members(expected);
    });

    it("should filter an entity list with both paths and regular expressions", () => {
        const filterObjects = [{ path: "/root/entity/b" }, { regex: /\/root\/entity\/[c]/ }];
        const filtered = filterEntityList({ filterObjects, entitiesOrPaths: entities });
        const expected = [
            { name: "B", path: "/root/entity/b" },
            { name: "C", path: "/root/entity/c" },
        ];
        expect(filtered).to.have.deep.members(expected);
    });
});
