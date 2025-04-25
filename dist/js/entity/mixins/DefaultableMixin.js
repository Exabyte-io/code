"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DefaultableMixin;
function defaultableMixinProps(item) {
    const props = {
        get isDefault() {
            return item.prop("isDefault", false);
        },
        set isDefault(isDefault) {
            item.setProp("isDefault", isDefault);
        },
    };
    Object.assign(item, props);
    return props;
}
function defaultableMixinStaticProps(item) {
    const properties = {
        createDefault() {
            // @ts-ignore
            return new item.prototype.constructor(item.defaultConfig);
        },
    };
    Object.assign(item, properties);
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
