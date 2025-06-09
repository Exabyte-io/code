"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inMemoryEntitySetMixin = inMemoryEntitySetMixin;
exports.default = InMemoryEntitySetMixin;
function inMemoryEntitySetMixin(item) {
    const properties = {
        containsEntity(entity) {
            var _a;
            return Boolean((_a = entity === null || entity === void 0 ? void 0 : entity.inSet) === null || _a === void 0 ? void 0 : _a.some((ref) => ref._id === item.id));
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function InMemoryEntitySetMixin(superclass) {
    class InMemoryEntitySetMixin extends superclass {
        constructor(...args) {
            super(...args);
            inMemoryEntitySetMixin(this);
        }
    }
    return InMemoryEntitySetMixin;
}
