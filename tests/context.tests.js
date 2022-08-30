import { expect } from "chai";
import { mix } from "mixwith";

import { MaterialContextMixin } from "../src/context/mixins";
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

class ProviderEntity extends mix(InMemoryEntity).with(MaterialContextMixin) {
    static materialCls = MockMaterial;
}

class DerivedProviderEntity extends ProviderEntity {
    static materialCls = SpecificMockMaterial;
}

describe("MaterialContextMixin", () => {
    const config = {};

    it("uses static material class", () => {
        const provider = new ProviderEntity(config);
        expect(provider.material).to.be.equal("defaultMockMaterial");
    });

    it("uses static material class from derived class", () => {
        const provider = new DerivedProviderEntity(config);
        expect(provider.material).to.be.equal("defaultSpecificMockMaterial");
    });
});
