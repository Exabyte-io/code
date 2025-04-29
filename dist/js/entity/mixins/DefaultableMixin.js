"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultableMixinProps = defaultableMixinProps;
exports.defaultableMixinStaticProps = defaultableMixinStaticProps;
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
function defaultableMixinStaticProps(Item) {
    const properties = {
        createDefault() {
            // @ts-ignore
            return new Item(item.defaultConfig);
        },
    };
    Object.defineProperties(Item, Object.getOwnPropertyDescriptors(properties));
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
