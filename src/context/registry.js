export class ContextProviderRegistryContainer {

    constructor(config = {}) {
        this._providers = [];
    }

    get providers() {
        return this._providers;
    }

    set providers(p) {
        this._providers = p;
    }

    addProvider({name, instance}) {
        this._providers.push({
            name,
            instance
        });
    }

    findProviderInstanceByName(name) {
        const p = this.providers.find(p => p.name === name);
        return p && p.instance;
    }

    removeProvider(providerCls) {
        this.providers = this.providers.filter(p => p.name === providerCls.name);
    }

    removeProviderByName(name) {
        this.providers = this.providers.filter(p => p.name === name);
    }

}
