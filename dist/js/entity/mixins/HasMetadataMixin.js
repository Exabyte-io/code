"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMetadataMixin = hasMetadataMixin;
exports.default = HasMetadataMixin;
function schemaMixin(item) {
    const schema = {
        get metadata() {
            return item.prop("metadata", {});
        },
        set metadata(object) {
            item.setProp("metadata", object);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));
    return schema;
}
function propertiesMixin(item) {
    const properties = {
        updateMetadata(object) {
            item.metadata = { ...item.metadata, ...object };
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function hasMetadataMixin(item) {
    return {
        ...schemaMixin(item),
        ...propertiesMixin(item),
    };
}
function HasMetadataMixin(superclass) {
    class HasMetadataMixin extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args) {
            super(...args);
            hasMetadataMixin(this);
        }
    }
    return HasMetadataMixin;
}
