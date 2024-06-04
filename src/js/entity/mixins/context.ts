import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";

import { deepClone } from "../../utils/clone";
import { InMemoryEntityConstructor } from "../in_memory";

// TODO: clarify interface
export type Context = AnyObject;

export function ContextAndRenderFieldsMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        _context: Context;

        /**
         * @see https://stackoverflow.com/questions/64396668/why-do-typescript-mixins-require-a-constructor-with-a-single-rest-parameter-any
         * */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...params: any[]) {
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
            if (executeRender) this.render();
        }

        // to get "persistent" context, that is stored in database and further should be provided to constructor
        // when the `parent` object is re-created
        getPersistentContext() {
            return this.prop<object>("context");
        }

        // to make context persistent in `_json`
        updatePersistentContext(ctx: object = {}) {
            this.setProp("context", { ...ctx });
        }

        // to get persistent and volatile context combined
        getCombinedContext() {
            return { ...this.getPersistentContext(), ...this.context };
        }

        // override in subclasses
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render(_context = this.context) {
            throw new Error("RenderInitMixin: render not implemented in derived class");
        }
    };
}

export interface ContextProvider {
    domain: string;
}

/*
 * @summary Handles logic for domain-specific context, eg. "important settings".
 *          Important settings are stored inside "important" property and have context providers associated with it.
 */
export function DomainContextProviderMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        _contextProviders: ContextProvider[];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);
            this._contextProviders = [];
        }

        get contextProviders() {
            // override in children
            return this._contextProviders;
        }
    };
}

export function ImportantSettingsProviderMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends DomainContextProviderMixin(superclass) {
        get important() {
            return deepClone(this._json.important || {});
        }

        setImportant(key: string, value: unknown) {
            this.setProp("important", { [key]: value });
        }

        get importantSettingsProviders() {
            return this.contextProviders.filter((p) => p.domain === "important");
        }

        get isImportantEdited() {
            return this.prop<boolean>("important.isEdited");
        }

        set isImportantEdited(bool) {
            this.setProp("important", Object.assign(this.important, { isEdited: bool }));
        }
    };
}
