"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InMemoryEntityInSetMixin;
function props(item) {
    return Object.assign(item, {
        get inSet() {
            return item.prop("inSet", []);
        },
        set inSet(inSet) {
            item.setProp("inSet", inSet);
        },
    });
}
function methods(item) {
    return Object.assign(item, {
        getInSetFilteredByCls(cls) {
            return item.inSet.filter((ref) => ref.cls === cls);
        },
        // finds a parent entity set of the same cls (hence `cls` field is absent)
        // NOTE: assumes that only one entry of this kind is present => gets the first one
        get parentEntitySetReference() {
            return item.inSet.find((item) => item._id && !item.cls);
        },
    });
}
function InMemoryEntityInSetMixin(superclass) {
    class InMemoryEntityInSetMixin extends superclass {
        constructor(...args) {
            super(...args);
            props(this);
            methods(this);
        }
    }
    return InMemoryEntityInSetMixin;
}
