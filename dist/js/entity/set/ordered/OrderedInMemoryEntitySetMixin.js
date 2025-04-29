"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderedEntitySetMixin = orderedEntitySetMixin;
exports.default = OrderedInMemoryEntitySetMixin;
const enums_1 = require("../enums");
function orderedEntitySetMixin(item) {
    const properties = {
        get isOrderedSet() {
            return item.entitySetType === enums_1.ENTITY_SET_TYPES.ordered;
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function OrderedInMemoryEntitySetMixin(superclass) {
    class OrderedInMemoryEntitySetMixin extends superclass {
        constructor(...args) {
            super(...args);
            orderedEntitySetMixin(this);
        }
    }
    return OrderedInMemoryEntitySetMixin;
}
