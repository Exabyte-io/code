"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DefaultableMixin;
function defaultableMixinProps(item) {
    const properties = {
        get isDefault() {
            return item.prop("isDefault", false);
        },
        set isDefault(isDefault) {
            item.setProp("isDefault", isDefault);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function defaultableMixinStaticProps(item) {
    const properties = {
        createDefault() {
            // @ts-ignore
            return new item.prototype.constructor(item.defaultConfig);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function DefaultableMixin(superclass) {
    class DefaultableMixin extends superclass {
        constructor(...args) {
            super(...args);
            defaultableMixinProps(this);
        }
    }
    defaultableMixinStaticProps(DefaultableMixin);
    return DefaultableMixin;
}
