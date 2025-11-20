"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.namedEntitySchemaMixin = namedEntitySchemaMixin;
function namedEntitySchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get name() {
            return this.prop("name");
        },
        set name(value) {
            this.setProp("name", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
