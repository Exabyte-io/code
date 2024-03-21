import { expect } from "chai";

import { ContextProvider } from "../../src/js/context/provider";

describe("ContextProvider", () => {
    const minimal = { name: "name" };
    const data = { a: "test" };

    it("can be created", () => {
        const provider = new ContextProvider(minimal);
        // eslint-disable-next-line no-unused-expressions
        expect(provider).to.exist;
    });

    it("sets and gets data", () => {
        const provider = new ContextProvider(minimal);
        provider.setData(data);
        expect(() => provider.getData()).to.throw("Not implemented.");
        provider.setIsEdited(true);
        expect(JSON.stringify(provider.getData())).to.equal(JSON.stringify(data));
        expect(() => provider.defaultData).to.throw("Not implemented.");
    });

    // transform, yieldData, yieldDataForRendering
});
