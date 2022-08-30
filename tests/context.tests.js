import { expect } from "chai";
import { mix } from "mixwith";

import { ApplicationContextMixin, MaterialContextMixin } from "../src/context/mixins";
import { InMemoryEntity } from "../src/entity";

class MockMaterial {
    static createDefault() {
        return "defaultMockMaterial";
    }
}

class SpecificMockMaterial {
    static createDefault() {
        return "defaultSpecificMockMaterial";
    }
}

class MockApplication {
    static createDefault() {
        return "defaultMockApplication";
    }
}

class SpecificMockApplication {
    static createDefault() {
        return "defaultSpecificMockApplication";
    }
}

class ProviderEntity extends mix(InMemoryEntity).with(
    MaterialContextMixin,
    ApplicationContextMixin,
) {
    static materialCls = MockMaterial;

    static applicationCls = MockApplication;
}

class DerivedProviderEntity extends ProviderEntity {
    static materialCls = SpecificMockMaterial;

    static applicationCls = SpecificMockApplication;
}

describe("Material & Application ContextMixin", () => {
    const config = {};

    it("uses static entity class", () => {
        const provider = new ProviderEntity(config);
        expect(provider.material).to.be.equal("defaultMockMaterial");
        expect(provider.application).to.be.equal("defaultMockApplication");
    });

    it("uses static entity class from derived class", () => {
        const provider = new DerivedProviderEntity(config);
        expect(provider.material).to.be.equal("defaultSpecificMockMaterial");
        expect(provider.application).to.be.equal("defaultSpecificMockApplication");
    });
});
