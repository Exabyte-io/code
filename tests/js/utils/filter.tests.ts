import { expect } from "chai";

import { filterEntityList, FilterObject } from "../../../src/js/utils/filter";

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

    it("should filter an entity list containing concatenated paths", () => {
        const filterObjects = [{ path: "/root/entity/b" }, { path: "/root/entity/c" }];
        const multiPathEntities = [
            { name: "AB", path: "/root/entity/a::/root/entity/b" },
            { name: "BC", path: "/root/entity/b::/root/entity/c" },
        ];
        const multiPathSeparator = "::";
        const filtered = filterEntityList({
            filterObjects,
            entitiesOrPaths: multiPathEntities,
            multiPathSeparator,
        });
        const expected = [{ name: "BC", path: "/root/entity/b::/root/entity/c" }];
        expect(filtered).to.have.deep.members(expected);
    });

    it("should filter an entity list containing concatenated paths using regex", () => {
        const filterObjects = [{ path: "/root/entity/b" }, { regex: /\/root\/entity\/[c]/ }];
        const multiPathEntities = [
            { name: "AB", path: "/root/entity/a::/root/entity/b" },
            { name: "BC", path: "/root/entity/b::/root/entity/c" },
        ];
        const multiPathSeparator = "::";
        const filtered = filterEntityList({
            filterObjects,
            entitiesOrPaths: multiPathEntities,
            multiPathSeparator,
        });
        const expected = [{ name: "BC", path: "/root/entity/b::/root/entity/c" }];
        expect(filtered).to.have.deep.members(expected);
    });

    it("should return empty list if empty filter object array is given", () => {
        const filterObjects: FilterObject[] = [];
        const filtered = filterEntityList({ filterObjects, entitiesOrPaths: entities });
        expect(filtered).to.have.length(0);
    });

    it("should return empty list if no filter object array is given", () => {
        const filterObjects = undefined;
        const filtered = filterEntityList({ filterObjects, entitiesOrPaths: entities });
        expect(filtered).to.have.length(0);
    });
});
