"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasConsistencyChecksMixin = hasConsistencyChecksMixin;
const HasConsistencyChecksSchemaMixin_1 = require("../../generated/HasConsistencyChecksSchemaMixin");
function hasConsistencyChecksMixin(item) {
    (0, HasConsistencyChecksSchemaMixin_1.hasConsistencyChecksSchemaMixin)(item);
    // @ts-expect-error
    const properties = {
        addConsistencyChecks(array) {
            this.consistencyChecks = [...(this.consistencyChecks || []), ...array];
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
