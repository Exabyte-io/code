"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasDescriptionSchemaMixin = hasDescriptionSchemaMixin;
function hasDescriptionSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get description() {
            return this.prop("description");
        },
        set description(value) {
            this.setProp("description", value);
        },
        get descriptionObject() {
            return this.prop("descriptionObject");
        },
        set descriptionObject(value) {
            this.setProp("descriptionObject", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
