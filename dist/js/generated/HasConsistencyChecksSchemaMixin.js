"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasConsistencyChecksSchemaMixin = hasConsistencyChecksSchemaMixin;
function hasConsistencyChecksSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get consistencyChecks() {
            return this.prop("consistencyChecks");
        },
        set consistencyChecks(value) {
            this.setProp("consistencyChecks", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
