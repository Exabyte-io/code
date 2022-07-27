export class ContextProviderRegistryContainer {
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
