"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodDataContextMixin = methodDataContextMixin;
exports.MethodDataContextMixin = MethodDataContextMixin;
const crypto_js_1 = __importDefault(require("crypto-js"));
function methodDataContextMixin(item) {
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
            const config = this.config;
            this._methodData = (config.context && config.context.methodData) || {};
            this.isEdited = Boolean(config.isEdited);
        },
        /* @summary Replace the logic in constructor with this in order to enable passing `methodDataHash` between
         *          subsequent initializations of the derived class. Not used at present and kept for the record.
         */
        _initMethodDataHash() {
            this.methodDataHash = crypto_js_1.default.MD5(JSON.stringify(this.methodData)).toString();
            this.extraData = { methodDataHash: this.methodDataHash };
            if (!this._methodData) {
                this._methodData = {};
                this.isEdited = false;
                // Commented out to reduce effect on performance. Uncomment for debugging purposes.
                // TODO: remove on next refactoring or convert to log
                // console.warn("MethodDataContextMixin: methodData is undefined or null");
            }
            else if (this.isMethodDataUpdated) {
                this.isEdited = false;
            }
            else {
                // @ts-ignore
                // eslint-disable-next-line no-undef
                this.isEdited = this.config.isEdited;
            }
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
function MethodDataContextMixin(superclass) {
    methodDataContextMixin(superclass.prototype);
    return superclass;
}
