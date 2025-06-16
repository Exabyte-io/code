import CryptoJS from "crypto-js";

import type { Constructor } from "../utils/types";
import type { ContextProvider } from "./provider";

export interface Pseudo {
    element: string;
    filename?: string;
    path?: string;
}

export interface MethodData {
    pseudo?: Pseudo[];
}

export type MethodDataConfig = {
    context?: {
        methodData?: MethodData;
    };
    isEdited?: boolean;
};

export type MethodDataContextMixinType = {
    isEdited?: boolean;
    methodDataHash?: string;
    extraData?: {
        methodDataHash?: string;
    };
    methodData: MethodData;
    _methodData: MethodData;
    isMethodDataUpdated: boolean;
    _initMethodDataHash: () => void;
    initMethodDataContextMixin: () => void;
};

export function methodDataContextMixin(item: ContextProvider) {
    const properties = {
        isEdited: false,

        _methodData: {},

        get methodData() {
            return this._methodData;
        },

        get isMethodDataUpdated() {
            return Boolean(this.extraData && this.extraData.methodDataHash !== this.methodDataHash);
        },

        initMethodDataContextMixin() {
            const config = this.config as MethodDataConfig;
            this._methodData = (config.context && config.context.methodData) || {};
            this.isEdited = Boolean(config.isEdited);
        },

        /* @summary Replace the logic in constructor with this in order to enable passing `methodDataHash` between
         *          subsequent initializations of the derived class. Not used at present and kept for the record.
         */
        _initMethodDataHash() {
            this.methodDataHash = CryptoJS.MD5(JSON.stringify(this.methodData)).toString();
            this.extraData = { methodDataHash: this.methodDataHash };
            if (!this._methodData) {
                this._methodData = {};
                this.isEdited = false;
                // Commented out to reduce effect on performance. Uncomment for debugging purposes.
                // TODO: remove on next refactoring or convert to log
                // console.warn("MethodDataContextMixin: methodData is undefined or null");
            } else if (this.isMethodDataUpdated) {
                this.isEdited = false;
            } else {
                // @ts-ignore
                // eslint-disable-next-line no-undef
                this.isEdited = this.config.isEdited;
            }
        },
    } as MethodDataContextMixinType & typeof item;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export function MethodDataContextMixin<T extends Constructor<ContextProvider>>(superclass: T) {
    methodDataContextMixin(superclass.prototype);
    return superclass as T & Constructor<MethodDataContextMixinType>;
}
