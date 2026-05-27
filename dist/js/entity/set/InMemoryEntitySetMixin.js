"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inMemoryEntitySetMixin = inMemoryEntitySetMixin;
function inMemoryEntitySetMixin(item) {
    // @ts-expect-error
    const properties = {
        containsEntity(entity) {
            var _a;
            return Boolean((_a = entity === null || entity === void 0 ? void 0 : entity.inSet) === null || _a === void 0 ? void 0 : _a.some((ref) => ref._id === this.id));
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
