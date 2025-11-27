"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMetadataMixin = hasMetadataMixin;
const HasMetadataSchemaMixin_1 = require("../../generated/HasMetadataSchemaMixin");
function hasMetadataPropertiesMixin(item) {
    // @ts-expect-error
    const properties = {
        updateMetadata(object) {
            this.setProp("metadata", { ...this.metadata, ...object });
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
function hasMetadataMixin(item) {
    (0, HasMetadataSchemaMixin_1.hasMetadataSchemaMixin)(item);
    hasMetadataPropertiesMixin(item);
}
