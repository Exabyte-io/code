"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderedEntityInSetMixin = orderedEntityInSetMixin;
function orderedEntityInSetMixin(item) {
    // @ts-expect-error
    const properties = {
        getIndexByIdInOrderedSet(setId) {
            const setData = this.inSet.find((s) => s._id === setId);
            return (setData === null || setData === void 0 ? void 0 : setData.index) || 0;
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
