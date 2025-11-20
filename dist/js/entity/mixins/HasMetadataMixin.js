"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMetadataMixin = hasMetadataMixin;
const HasMetadataSchemaMixin_1 = require("../../generated/HasMetadataSchemaMixin");
function hasMetadataMixin(item) {
    (0, HasMetadataSchemaMixin_1.hasMetadataSchemaMixin)(item);
    // @ts-expect-error
    const properties = {
        updateMetadata(object) {
            this.metadata = { ...this.metadata, ...object };
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
