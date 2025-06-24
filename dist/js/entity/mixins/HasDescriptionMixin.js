"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasDescriptionMixin = hasDescriptionMixin;
function hasDescriptionMixin(item) {
    // @ts-expect-error
    const properties = {
        get description() {
            return this.prop("description", "");
        },
        set description(string) {
            this.setProp("description", string);
        },
        get descriptionObject() {
            return this.prop("descriptionObject");
        },
        set descriptionObject(obj) {
            this.setProp("descriptionObject", obj);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
