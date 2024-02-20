export class ContextProviderRegistryContainer {
    _providers: any[];
    set providers(arg: any[]);
    get providers(): any[];
    addProvider({ name, instance }: {
        name: any;
        instance: any;
    }): void;
    findProviderInstanceByName(name: any): any;
    removeProvider(providerCls: any): void;
    removeProviderByName(name: any): void;
}
export function extendAndPatchRegistry(registryContainer: ContextProviderRegistryContainer, classConfigMap: any, classesToPatch?: any, defaultSettings?: {}): ContextProviderRegistryContainer;
export function createAndPatchRegistry(classConfigMap: any, classesToPatch?: {
    Material: SpecificMockMaterial;
}, defaultSettings?: {}): ContextProviderRegistryContainer;
