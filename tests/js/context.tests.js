Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const context_1 = require("../../src/js/context");

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
class ProviderEntity extends (0, context_1.MaterialContextMixin)(
    (0, context_1.ApplicationContextMixin)(context_1.ContextProvider),
) {}
ProviderEntity.Material = MockMaterial;
ProviderEntity.Application = MockApplication;
ProviderEntity.setting = 10;
class DerivedProviderEntity extends ProviderEntity {}
DerivedProviderEntity.Material = SpecificMockMaterial;
DerivedProviderEntity.Application = SpecificMockApplication;
class ApplicationContextProvider extends (0, context_1.ApplicationContextMixin)(
    context_1.ContextProvider,
) {}
ApplicationContextProvider.Application = SpecificMockApplication;
describe("Material & Application ContextMixin", () => {
    const config = { name: "test" };
    it("uses static entity class", () => {
        const provider = new ProviderEntity(config);
        (0, chai_1.expect)(provider.material).to.be.equal("defaultMockMaterial");
        (0, chai_1.expect)(provider.application).to.be.equal("defaultMockApplication");
    });
    it("uses static entity class from derived class", () => {
        const provider = new DerivedProviderEntity(config);
        (0, chai_1.expect)(provider.material).to.be.equal("defaultSpecificMockMaterial");
        (0, chai_1.expect)(provider.application).to.be.equal("defaultSpecificMockApplication");
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
    const defaultSettings = {
        ProviderEntity: {
            setting: 100,
        },
    };
    it("can be created and patched", () => {
        const registry = (0, context_1.createAndPatchRegistry)(
            classConfigObj,
            { Material: SpecificMockMaterial },
            defaultSettings,
        );
        const _dataProvider = registry.findProviderInstanceByName("DataManager");
        const dataProvider = new _dataProvider.constructor(_dataProvider.config);
        const _appProvider = registry.findProviderInstanceByName("ApplicationDataManager");
        const appProvider = new _appProvider.constructor(_appProvider.config);
        (0, chai_1.expect)(_dataProvider.constructor.setting).to.be.equal(100);
        (0, chai_1.expect)(dataProvider.material).to.be.equal("defaultSpecificMockMaterial");
        (0, chai_1.expect)(appProvider.application).to.be.equal("defaultSpecificMockApplication");
    });
});
