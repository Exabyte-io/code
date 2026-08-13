"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashedSchemaMixin = hashedSchemaMixin;
function hashedSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get hash() {
            return this.requiredProp("hash");
        },
        set hash(value) {
            this.setProp("hash", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
