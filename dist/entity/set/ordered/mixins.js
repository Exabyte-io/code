"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderedInMemoryEntityInSetMixin = exports.OrderedInMemoryEntitySetMixin = void 0;
const enums_1 = require("../enums");
// NOTE: these mixins are meant to be used together with `InMemoryEntity{In}SetMixin`s only
function OrderedInMemoryEntitySetMixin(superclass) {
    return class extends superclass {
        get isOrderedSet() {
            return this.entitySetType === enums_1.ENTITY_SET_TYPES.ordered;
        }
    };
}
exports.OrderedInMemoryEntitySetMixin = OrderedInMemoryEntitySetMixin;
function OrderedInMemoryEntityInSetMixin(superclass) {
    return class extends superclass {
        getIndexByIdInOrderedSet(setId) {
            const setData = this.inSet.find((s) => s._id === setId);
            return (setData === null || setData === void 0 ? void 0 : setData.index)
                ? setData.index
                : 0;
        }
    };
}
exports.OrderedInMemoryEntityInSetMixin = OrderedInMemoryEntityInSetMixin;
