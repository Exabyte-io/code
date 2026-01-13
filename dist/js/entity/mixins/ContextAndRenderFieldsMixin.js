"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextAndRenderFieldsMixin = contextAndRenderFieldsMixin;
function contextAndRenderFieldsMixin(item) {
    // @ts-expect-error
    const properties = {
        updateContext(ctx) {
            this.context = { ...this.context, ...ctx };
        },
        getPersistentContext() {
            return this.prop("context");
        },
        updatePersistentContext(ctx) {
            this.setProp("context", { ...ctx });
        },
        getCombinedContext() {
            return { ...this.getPersistentContext(), ...this.context };
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
