"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasDescriptionMixin = hasDescriptionMixin;
exports.default = HasDescriptionMixin;
function schemaMixin(item) {
    const schema = {
        get description() {
            return item.prop("description", "");
        },
        set description(string) {
            item.setProp("description", string);
        },
        get descriptionObject() {
            return item.prop("descriptionObject");
        },
        set descriptionObject(obj) {
            item.setProp("descriptionObject", obj);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));
    return schema;
}
function hasDescriptionMixin(item) {
    return schemaMixin(item);
}
function HasDescriptionMixin(superclass) {
    class HasDescriptionMixin extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args) {
            super(...args);
            hasDescriptionMixin(this);
        }
    }
    return HasDescriptionMixin;
}
