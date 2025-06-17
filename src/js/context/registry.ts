import type { ContextProvider, ContextProviderConfig, ContextProviderStatic } from "./provider";

export interface ContextProviderInstance {
    constructor: typeof ContextProvider;
    config: ContextProviderConfig;
}

export class ContextProviderRegistryContainer {
    _providers: {
        name: string;
        instance: ContextProviderInstance;
    }[];

    constructor() {
        this._providers = [];
    }

    get providers() {
        return this._providers;
    }

    set providers(p) {
        this._providers = p;
    }

    addProvider({ name, instance }: { name: string; instance: ContextProviderInstance }) {
        this._providers.push({
            name,
            instance,
        });
    }

    findProviderInstanceByName(name: string) {
        const provider = this.providers.find((p) => p.name === name);
        return provider && provider.instance;
    }

    removeProvider(providerCls: ContextProvider) {
        this.providers = this.providers.filter((p) => p.name === providerCls.name);
    }

    removeProviderByName(name: string) {
        this.providers = this.providers.filter((p) => p.name === name);
    }
}

type ContextProviderStaticEntry = [
    keyof ContextProviderStatic,
    ContextProviderStatic[keyof ContextProviderStatic],
];

/** Extends an existing context provider registry container and patches static class variables if applicable.
 * @example
 * const classConfigMap = {
 *     PlanewaveCutoffDataManager: {
 *         providerCls: PlanewaveCutoffsContextProvider,
 *         config: _makeImportant({ name: "cutoffs", entityName: "subworkflow" })
 *     },
 * };
 */
export const extendAndPatchRegistry = (
    registryContainer: ContextProviderRegistryContainer,
    classConfigMap: Record<
        string,
        { providerCls: typeof ContextProvider; config: ContextProviderConfig }
    >,
    classesToPatch: Partial<ContextProviderStatic> = {},
    defaultSettings: Partial<Record<string, ContextProviderStatic>> = {},
) => {
    Object.entries(classConfigMap).forEach(([name, { providerCls, config }]) => {
        const entries = Object.entries(classesToPatch) as ContextProviderStaticEntry[];

        entries.forEach(([clsName, cls]) => {
            if (providerCls[clsName]) {
                // @ts-expect-error
                providerCls[clsName] = cls;
            }
            const providerDefaultSettings = defaultSettings[providerCls.name];
            if (providerDefaultSettings) {
                const providerDefaultSettingsEntries = Object.entries(
                    providerDefaultSettings,
                ) as ContextProviderStaticEntry[];

                providerDefaultSettingsEntries.forEach(([key, value]) => {
                    if (providerCls[key]) {
                        // @ts-expect-error
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

/** Creates a new context provider registry container and patches static class variables if applicable.
 *
 * @param {Object} classConfigMap
 * @param {{Material: SpecificMockMaterial}} classesToPatch
 */
export const createAndPatchRegistry = (
    classConfigMap: Record<
        string,
        { providerCls: typeof ContextProvider; config: ContextProviderConfig }
    >,
    classesToPatch: Partial<ContextProviderStatic> = {},
    defaultSettings: Partial<Record<string, ContextProviderStatic>> = {},
) => {
    const registryContainer = new ContextProviderRegistryContainer();
    return extendAndPatchRegistry(
        registryContainer,
        classConfigMap,
        classesToPatch,
        defaultSettings,
    );
};
