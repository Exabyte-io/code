"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InMemoryEntitySetMixin;
function methods(item) {
    return Object.assign(item, {
        containsEntity(entity) {
            var _a;
            return Boolean((_a = entity === null || entity === void 0 ? void 0 : entity.inSet) === null || _a === void 0 ? void 0 : _a.some((ref) => ref._id === item.id));
        },
    });
}
function InMemoryEntitySetMixin(superclass) {
    class InMemoryEntitySetMixin extends superclass {
        constructor(...args) {
            super(...args);
            methods(this);
        }
    }
    return InMemoryEntitySetMixin;
}
