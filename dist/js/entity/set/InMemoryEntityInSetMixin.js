"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inMemoryEntityInSetMixin = inMemoryEntityInSetMixin;
exports.default = InMemoryEntityInSetMixin;
function inMemoryEntityInSetMixin(item) {
    // @ts-expect-error
    const properties = {
        get inSet() {
            return this.prop("inSet", []);
        },
        set inSet(inSet) {
            this.setProp("inSet", inSet);
        },
        getInSetFilteredByCls(cls) {
            return this.inSet.filter((ref) => ref.cls === cls);
        },
        // finds a parent entity set of the same cls (hence `cls` field is absent)
        // NOTE: assumes that only one entry of this kind is present => gets the first one
        get parentEntitySetReference() {
            return this.inSet.find((inSetItem) => inSetItem._id && !inSetItem.cls);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
function InMemoryEntityInSetMixin(superclass) {
    class InMemoryEntityInSetMixin extends superclass {
    }
    inMemoryEntityInSetMixin(InMemoryEntityInSetMixin.prototype);
    return InMemoryEntityInSetMixin;
}
