/* eslint-disable max-classes-per-file */
import { expect } from "chai";
import { mix } from "mixwith";

import {
    ApplicationContextMixin,
    ContextProvider,
    createAndPatchRegistry,
    MaterialContextMixin,
} from "../src/context";

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

class ProviderEntity extends mix(ContextProvider).with(
    MaterialContextMixin,
    ApplicationContextMixin,
) {
    static Material = MockMaterial;

    static Application = MockApplication;
}

class DerivedProviderEntity extends ProviderEntity {
    static Material = SpecificMockMaterial;

    static Application = SpecificMockApplication;
}

class ApplicationContextProvider extends mix(ContextProvider).with(ApplicationContextMixin) {
    static Application = SpecificMockApplication;
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

describe("ContextProviderRegistryContainer", () => {
    const classConfigObj = {
        DataManager: {
            providerCls: ProviderEntity,
            config: { name: "example1", domain: "important" },
        },
        ApplicationDataManager: {
            providerCls: ApplicationContextProvider,
            config: { name: "example2", domain: "important" },
        },
    };

    it("can be created and patched", () => {
        const registry = createAndPatchRegistry(classConfigObj, { Material: SpecificMockMaterial });
        const _dataProvider = registry.findProviderInstanceByName("DataManager");
        const dataProvider = new _dataProvider.constructor(_dataProvider.config);
        const _appProvider = registry.findProviderInstanceByName("ApplicationDataManager");
        const appProvider = new _appProvider.constructor(_appProvider.config);
        expect(dataProvider.material).to.be.equal("defaultSpecificMockMaterial");
        expect(appProvider.application).to.be.equal("defaultSpecificMockApplication");
    });
});
