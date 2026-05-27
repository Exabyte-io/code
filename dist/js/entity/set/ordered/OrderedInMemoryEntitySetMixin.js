"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderedEntitySetMixin = orderedEntitySetMixin;
const enums_1 = require("../enums");
function orderedEntitySetMixin(item) {
    // @ts-expect-error
    const properties = {
        get isOrderedSet() {
            return this.entitySetType === enums_1.ENTITY_SET_TYPES.ordered;
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
