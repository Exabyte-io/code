"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMetadataMixin = hasMetadataMixin;
function hasMetadataMixin(item) {
    // @ts-expect-error
    const properties = {
        get metadata() {
            return this.prop("metadata", {});
        },
        set metadata(object) {
            this.setProp("metadata", object);
        },
        updateMetadata(object) {
            this.metadata = { ...this.metadata, ...object };
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
