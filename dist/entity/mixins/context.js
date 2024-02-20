"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportantSettingsProviderMixin = exports.DomainContextProviderMixin = exports.ContextAndRenderFieldsMixin = void 0;
const clone_1 = require("../../utils/clone");
function ContextAndRenderFieldsMixin(superclass) {
    return class extends superclass {
        /**
         * @see https://stackoverflow.com/questions/64396668/why-do-typescript-mixins-require-a-constructor-with-a-single-rest-parameter-any
         * */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...params) {
            super(...params);
            this._context = params[0].context || {};
        }
        // in-memory, or "volatile" context that is reset when the `parent` object is destroyed
        get context() {
            return this._context;
        }
        set context(newContext) {
            this._context = newContext;
        }
        updateContext(ctx = {}, executeRender = false) {
            this._context = { ...this.context, ...ctx };
            if (executeRender)
                this.render();
        }
        // to get "persistent" context, that is stored in database and further should be provided to constructor
        // when the `parent` object is re-created
        getPersistentContext() {
            return this.prop("context");
        }
        // to make context persistent in `_json`
        updatePersistentContext(ctx = {}) {
            this.setProp("context", { ...ctx });
        }
        // to get persistent and volatile context combined
        getCombinedContext() {
            return { ...this.getPersistentContext(), ...this.context };
        }
        // override in subclasses
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        render(context = this.context) {
            throw new Error("RenderInitMixin: render not implemented in derived class");
        }
    };
}
exports.ContextAndRenderFieldsMixin = ContextAndRenderFieldsMixin;
/*
 * @summary Handles logic for domain-specific context, eg. "important settings".
 *          Important settings are stored inside "important" property and have context providers associated with it.
 */
function DomainContextProviderMixin(superclass) {
    return class extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args) {
            super(...args);
            this._contextProviders = [];
        }
        get contextProviders() {
            // override in children
            return this._contextProviders;
        }
    };
}
exports.DomainContextProviderMixin = DomainContextProviderMixin;
function ImportantSettingsProviderMixin(superclass) {
    return class extends DomainContextProviderMixin(superclass) {
        get important() {
            return (0, clone_1.deepClone)(this._json.important || {});
        }
        setImportant(key, value) {
            this.setProp("important", { [key]: value });
        }
        get importantSettingsProviders() {
            return this.contextProviders.filter((p) => p.domain === "important");
        }
        get isImportantEdited() {
            return this.prop("important.isEdited");
        }
        set isImportantEdited(bool) {
            this.setProp("important", Object.assign(this.important, { isEdited: bool }));
        }
    };
}
exports.ImportantSettingsProviderMixin = ImportantSettingsProviderMixin;
