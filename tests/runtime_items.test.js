import { expect } from "chai";
import { mix } from "mixwith";

import { InMemoryEntity } from "../src/entity";
import { RuntimeItemsMixin, RuntimeItemsUILogicMixin } from "../src/entity/mixins/runtime_items";

class MockEntity extends mix(InMemoryEntity).with(RuntimeItemsMixin, RuntimeItemsUILogicMixin) {
    // eslint-disable-next-line class-methods-use-this
    get defaultResults() {
        return [{ name: "total_energy" }, { name: "fermi_energy" }, { name: "pressure" }];
    }
}

describe("RuntimeItemUILogicMixin", () => {
    const resultsArray = [
        { name: "total_energy" },
        { name: "total_energy_contributions" },
        { name: "file_content", filetype: "image", basename: "test.png" },
        { name: "file_content", filetype: "text", basename: "mo_coefficients.txt" },
    ];

    it("results can be extended with an array of results by name", () => {
        const entity = new MockEntity();
        entity.updateResultsWithArrayOfObjectsByName("file_content", resultsArray);
        const nResults =
            entity.defaultResults.length +
            resultsArray.filter((r) => r.name === "file_content").length;
        expect(entity.results.length).to.be.equal(nResults);
        expect(entity.results.map((r) => r.name)).to.include("file_content");
    });

    it("results can be updated from an array of results without duplicates", () => {
        const entity = new MockEntity();
        entity.setProp("results", resultsArray.slice(0, 3));
        // one potential duplicate (basename: 'test.png')
        entity.updateResultsWithArrayOfObjectsByName("file_content", resultsArray);
        const nFileResults = resultsArray.filter((r) => r.name === "file_content").length;
        expect(entity.filterResultsByName("file_content").length).to.be.equal(nFileResults);
    });

    it("results are deleted by name when empty array of results is passed", () => {
        const entity = new MockEntity();
        entity.updateResultsWithArrayOfObjectsByName("file_content", resultsArray);
        entity.updateResultsWithArrayOfObjectsByName("file_content", []);
        expect(entity.getResultByName("file_content")).to.be.undefined;
    });
});
