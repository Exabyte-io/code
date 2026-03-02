"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultableSchemaMixin = defaultableSchemaMixin;
function defaultableSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get isDefault() {
            return this.prop("isDefault");
        },
        set isDefault(value) {
            this.setProp("isDefault", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
