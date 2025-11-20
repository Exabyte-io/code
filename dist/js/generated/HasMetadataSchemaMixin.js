"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMetadataSchemaMixin = hasMetadataSchemaMixin;
function hasMetadataSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get metadata() {
            return this.prop("metadata");
        },
        set metadata(value) {
            this.setProp("metadata", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
