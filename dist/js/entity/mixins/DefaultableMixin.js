"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultableEntityMixin = defaultableEntityMixin;
exports.defaultableEntityStaticMixin = defaultableEntityStaticMixin;
function defaultableEntityMixin(item) {
    // @ts-expect-error
    const properties = {
        get isDefault() {
            return this.prop("isDefault", false);
        },
        set isDefault(isDefault) {
            this.setProp("isDefault", isDefault);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function defaultableEntityStaticMixin(Item) {
    // @ts-expect-error
    const staticProperties = {
        createDefault() {
            return new this(this.defaultConfig);
        },
    };
    Object.defineProperties(Item, Object.getOwnPropertyDescriptors(staticProperties));
    return staticProperties;
}
