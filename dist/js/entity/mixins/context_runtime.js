"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeContextFieldMixin = RuntimeContextFieldMixin;
function RuntimeContextFieldMixin(superclass) {
    return class extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args) {
            super(...args);
            const config = args[0];
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
        toJSON(exclude = []) {
            return { ...super.toJSON(exclude), runtimeContext: this._runtimeContext };
        }
    };
}
