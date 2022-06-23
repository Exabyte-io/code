export const RuntimeContextFieldMixin = (superclass) => {
    return class extends superclass {
        constructor(config) {
            super(config);
            this._runtimeContext = config.runtimeContext || {};
        }

        // in-memory, or "volatile" runtimeContext that is reset when the `parent` object is destroyed
        get runtimeContext() {
            return this._runtimeContext;
        }

        set runtimeContext(newContext) {
            this._runtimeContext = newContext;
        }

        updateRuntimeContext(ctx = {}) {
            this.runtimeContext = Object.assign(this._runtimeContext, ctx);
        }

        toJSON() {
            return Object.assign({}, super.toJSON(), {runtimeContext: this._runtimeContext});
        }
    };
};
