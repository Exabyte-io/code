"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.namedEntityMixin = namedEntityMixin;
function namedEntityMixin(item) {
    // @ts-expect-error
    const properties = {
        get name() {
            return this.prop("name", "");
        },
        set name(name) {
            this.setProp("name", name);
        },
        setName(name) {
            this.setProp("name", name);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
