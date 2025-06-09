"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inMemoryEntityInSetMixin = inMemoryEntityInSetMixin;
exports.default = InMemoryEntityInSetMixin;
function schemaMixin(item) {
    const schema = {
        get inSet() {
            return item.prop("inSet", []);
        },
        set inSet(inSet) {
            item.setProp("inSet", inSet);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));
    return schema;
}
function propertiesMixin(item) {
    const properties = {
        getInSetFilteredByCls(cls) {
            return item.inSet.filter((ref) => ref.cls === cls);
        },
        // finds a parent entity set of the same cls (hence `cls` field is absent)
        // NOTE: assumes that only one entry of this kind is present => gets the first one
        get parentEntitySetReference() {
            return item.inSet.find((item) => item._id && !item.cls);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function inMemoryEntityInSetMixin(item) {
    return {
        ...schemaMixin(item),
        ...propertiesMixin(item),
    };
}
function InMemoryEntityInSetMixin(superclass) {
    class InMemoryEntityInSetMixin extends superclass {
        constructor(...args) {
            super(...args);
            inMemoryEntityInSetMixin(this);
        }
    }
    return InMemoryEntityInSetMixin;
}
