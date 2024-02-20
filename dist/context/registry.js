"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndPatchRegistry = exports.extendAndPatchRegistry = exports.ContextProviderRegistryContainer = void 0;
class ContextProviderRegistryContainer {
    constructor() {
        this._providers = [];
    }
    get providers() {
        return this._providers;
    }
    set providers(p) {
        this._providers = p;
    }
    addProvider({ name, instance }) {
        this._providers.push({
            name,
            instance,
        });
    }
    findProviderInstanceByName(name) {
        const provider = this.providers.find((p) => p.name === name);
        return provider && provider.instance;
    }
    removeProvider(providerCls) {
        this.providers = this.providers.filter((p) => p.name === providerCls.name);
    }
    removeProviderByName(name) {
        this.providers = this.providers.filter((p) => p.name === name);
    }
}
exports.ContextProviderRegistryContainer = ContextProviderRegistryContainer;
/** Extends an existing context provider registry container and patches static class variables if applicable.
 *
 * @param {ContextProviderRegistryContainer} registryContainer
 * @param {Object} classConfigMap
 * @param {Object} classesToPatch
 * @example
 * const classConfigMap = {
 *     PlanewaveCutoffDataManager: {
 *         providerCls: PlanewaveCutoffsContextProvider,
 *         config: _makeImportant({ name: "cutoffs", entityName: "subworkflow" })
 *     },
 * };
 *
 */
const extendAndPatchRegistry = (registryContainer, classConfigMap, classesToPatch = {}, defaultSettings = {}) => {
    Object.entries(classConfigMap).forEach(([name, { providerCls, config }]) => {
        Object.entries(classesToPatch).forEach(([clsName, cls]) => {
            if (providerCls[clsName]) {
                providerCls[clsName] = cls;
            }
            const providerDefaultSettings = defaultSettings[providerCls.name];
            if (providerDefaultSettings) {
                Object.entries(providerDefaultSettings).forEach(([key, value]) => {
                    if (providerCls[key]) {
                        providerCls[key] = value;
                    }
                });
            }
        });
        registryContainer.addProvider({
            instance: providerCls.getConstructorConfig(config),
            name,
        });
    });
    return registryContainer;
};
exports.extendAndPatchRegistry = extendAndPatchRegistry;
/** Creates a new context provider registry container and patches static class variables if applicable.
 *
 * @param {Object} classConfigMap
 * @param {{Material: SpecificMockMaterial}} classesToPatch
 */
const createAndPatchRegistry = (classConfigMap, classesToPatch = {}, defaultSettings = {}) => {
    const registryContainer = new ContextProviderRegistryContainer();
    return (0, exports.extendAndPatchRegistry)(registryContainer, classConfigMap, classesToPatch, defaultSettings);
};
exports.createAndPatchRegistry = createAndPatchRegistry;
