"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMetadataMixin = hasMetadataMixin;
function hasMetadataPropertiesMixin(item) {
    // @ts-expect-error
    const properties = {
        get metadata() {
            return this.prop("metadata");
        },
        set metadata(value) {
            this.setProp("metadata", value);
        },
        updateMetadata(object) {
            this.setProp("metadata", { ...this.metadata, ...object });
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
function hasMetadataMixin(item) {
    hasMetadataPropertiesMixin(item);
}
