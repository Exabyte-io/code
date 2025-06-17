import type { ContextProvider, ContextProviderConfig, ContextProviderStatic } from "./provider";
export interface ContextProviderInstance {
    constructor: typeof ContextProvider;
    config: ContextProviderConfig;
}
export declare class ContextProviderRegistryContainer {
    _providers: {
        name: string;
        instance: ContextProviderInstance;
    }[];
    constructor();
    get providers(): {
        name: string;
        instance: ContextProviderInstance;
    }[];
    set providers(p: {
        name: string;
        instance: ContextProviderInstance;
    }[]);
    addProvider({ name, instance }: {
        name: string;
        instance: ContextProviderInstance;
    }): void;
    findProviderInstanceByName(name: string): ContextProviderInstance | undefined;
    removeProvider(providerCls: ContextProvider): void;
    removeProviderByName(name: string): void;
}
/** Extends an existing context provider registry container and patches static class variables if applicable.
 * @example
 * const classConfigMap = {
 *     PlanewaveCutoffDataManager: {
 *         providerCls: PlanewaveCutoffsContextProvider,
 *         config: _makeImportant({ name: "cutoffs", entityName: "subworkflow" })
 *     },
 * };
 */
export declare const extendAndPatchRegistry: (registryContainer: ContextProviderRegistryContainer, classConfigMap: Record<string, {
    providerCls: typeof ContextProvider;
    config: ContextProviderConfig;
}>, classesToPatch?: Partial<ContextProviderStatic>, defaultSettings?: Partial<Record<string, ContextProviderStatic>>) => ContextProviderRegistryContainer;
/** Creates a new context provider registry container and patches static class variables if applicable.
 *
 * @param {Object} classConfigMap
 * @param {{Material: SpecificMockMaterial}} classesToPatch
 */
export declare const createAndPatchRegistry: (classConfigMap: Record<string, {
    providerCls: typeof ContextProvider;
    config: ContextProviderConfig;
}>, classesToPatch?: Partial<ContextProviderStatic>, defaultSettings?: Partial<Record<string, ContextProviderStatic>>) => ContextProviderRegistryContainer;
