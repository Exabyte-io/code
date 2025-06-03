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
const staticProperties = {
    createDefault() {
        return new this(this.defaultConfig);
    },
};
function defaultableMixinStaticProps(Item) {
    Object.defineProperties(Item, Object.getOwnPropertyDescriptors(staticProperties));
    return staticProperties;
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
