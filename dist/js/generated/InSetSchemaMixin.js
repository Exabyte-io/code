"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inSetSchemaMixin = inSetSchemaMixin;
function inSetSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get inSet() {
            return this.requiredProp("inSet");
        },
        set inSet(value) {
            this.setProp("inSet", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
