"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityInSetPropsMixin = entityInSetPropsMixin;
exports.entityInSetMethodsMixin = entityInSetMethodsMixin;
exports.default = InMemoryEntityInSetMixin;
function entityInSetPropsMixin(item) {
    const properties = {
        get inSet() {
            return item.prop("inSet", []);
        },
        set inSet(inSet) {
            item.setProp("inSet", inSet);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function entityInSetMethodsMixin(item) {
    const methods = {
        getInSetFilteredByCls(cls) {
            return item.inSet.filter((ref) => ref.cls === cls);
        },
        // finds a parent entity set of the same cls (hence `cls` field is absent)
        // NOTE: assumes that only one entry of this kind is present => gets the first one
        get parentEntitySetReference() {
            return item.inSet.find((item) => item._id && !item.cls);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(methods));
    return methods;
}
function InMemoryEntityInSetMixin(superclass) {
    class InMemoryEntityInSetMixin extends superclass {
        constructor(...args) {
            super(...args);
            entityInSetPropsMixin(this);
            entityInSetMethodsMixin(this);
        }
    }
    return InMemoryEntityInSetMixin;
}
