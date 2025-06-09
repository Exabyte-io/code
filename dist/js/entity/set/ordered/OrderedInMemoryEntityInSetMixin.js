"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderedEntityInSetMixin = orderedEntityInSetMixin;
exports.default = OrderedInMemoryEntityInSetMixin;
function orderedEntityInSetMixin(item) {
    const properties = {
        getIndexByIdInOrderedSet(setId) {
            const setData = item.inSet.find((s) => s._id === setId);
            return (setData === null || setData === void 0 ? void 0 : setData.index) || 0;
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function OrderedInMemoryEntityInSetMixin(superclass) {
    class OrderedInMemoryEntityInSetMixin extends superclass {
        constructor(...args) {
            super(...args);
            orderedEntityInSetMixin(this);
        }
    }
    return OrderedInMemoryEntityInSetMixin;
}
