"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DefaultableMixin;
function props(item) {
    return Object.assign(item, {
        get isDefault() {
            return item.prop("isDefault", false);
        },
        set isDefault(isDefault) {
            item.setProp("isDefault", isDefault);
        },
    });
}
function staticProps(item) {
    const properties = {
        createDefault() {
            // @ts-ignore
            return new item.prototype.constructor(item.defaultConfig);
        },
    };
    return Object.assign(item, properties);
}
function DefaultableMixin(superclass) {
    class DefaultableMixin extends superclass {
        constructor(...args) {
            super(...args);
            props(this);
        }
    }
    staticProps(DefaultableMixin);
    return DefaultableMixin;
}
