import { deepClone } from "../../utils/clone";

export const ContextAndRenderFieldsMixin = (superclass) => {
    return class extends superclass {
        constructor(config) {
            super(config);
            this._context = config.context || {};
        }

        // in-memory, or "volatile" context that is reset when the `parent` object is destroyed
        get context() {
            return this._context;
        }

        set context(newContext) {
            this._context = newContext;
        }

        updateContext(ctx = {}, executeRender = false) {
            this._context = Object.assign({}, this.context, ctx);
            executeRender && this.render();
        }

        // to get "persistent" context, that is stored in database and further should be provided to constructor
        // when the `parent` object is re-created
        getPersistentContext() {
            return this.prop("context");
        }

        // to make context persistent in `_json`
        updatePersistentContext(ctx = {}) {
            this.setProp("context", Object.assign({}, ctx));
        }

        // to get persistent and volatile context combined
        getCombinedContext() {
            return Object.assign({}, this.getPersistentContext(), this.context);
        }

        // override in subclasses
        render(context = this.context) {
            throw new Error("RenderInitMixin: render not implemented in derived class");
        }
    };
};

/*
 * @summary Handles logic for domain-specific context, eg. "important settings".
 *          Important settings are stored inside "important" property and have context providers associated with it.
 */
export const DomainContextProviderMixin = (superclass) => {
    return class extends superclass {
        constructor(config) {
            super(config);
            this._contextProviders = [];
        }

        get contextProviders() {
            // override in children
            return this._contextProviders;
        }
    };
};

export const ImportantSettingsProviderMixin = (superclass) => {
    return class extends DomainContextProviderMixin(superclass) {
        get important() {
            return deepClone(this._json.important || {});
        }

        setImportant(key, value) {
            this.setProp("important", {[key]: value})
        }

        /**
         * @return {JSONSchemaFormDataProvider[]}
         */
        get importantSettingsProviders() {
            return this.contextProviders.filter(p => p.domain === "important");
        }

        get isImportantEdited() {
            return this.prop("important.isEdited");
        }

        set isImportantEdited(bool) {
            this.setProp("important", Object.assign(this.important, {isEdited: bool}));
        }
    };
};
