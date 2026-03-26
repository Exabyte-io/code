"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taggableSchemaMixin = taggableSchemaMixin;
function taggableSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get tags() {
            return this.prop("tags");
        },
        set tags(value) {
            this.setProp("tags", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
