Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const provider_1 = require("../../src/js/context/provider");

describe("ContextProvider", () => {
    const minimal = { name: "name" };
    const data = { a: "test" };
    it("can be created", () => {
        const provider = new provider_1.ContextProvider(minimal);
        // eslint-disable-next-line no-unused-expressions
        (0, chai_1.expect)(provider).to.exist;
    });
    it("sets and gets data", () => {
        const provider = new provider_1.ContextProvider(minimal);
        provider.setData(data);
        (0, chai_1.expect)(() => provider.getData()).to.throw("Not implemented.");
        provider.setIsEdited(true);
        (0, chai_1.expect)(JSON.stringify(provider.getData())).to.equal(JSON.stringify(data));
        (0, chai_1.expect)(() => provider.defaultData).to.throw("Not implemented.");
    });
    // transform, yieldData, yieldDataForRendering
});
