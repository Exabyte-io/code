"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasConsistencyChecksMixin = hasConsistencyChecksMixin;
function hasConsistencyChecksMixin(item) {
    // @ts-expect-error
    const properties = {
        get consistencyChecks() {
            return this.prop("consistencyChecks", []);
        },
        set consistencyChecks(array) {
            this.setProp("consistencyChecks", array);
        },
        addConsistencyChecks(array) {
            this.consistencyChecks = [...(this.consistencyChecks || []), ...array];
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
