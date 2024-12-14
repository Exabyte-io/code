"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryEntityInSetMixin = InMemoryEntityInSetMixin;
exports.InMemoryEntitySetMixin = InMemoryEntitySetMixin;
function InMemoryEntityInSetMixin(superclass) {
    return class InMemoryEntityInSetMixin extends superclass {
        get inSet() {
            return this.prop("inSet", []);
        }
        set inSet(inSet) {
            this.setProp("inSet", inSet);
        }
        getInSetFilteredByCls(cls) {
            return this.inSet.filter((ref) => ref.cls === cls);
        }
        // finds a parent entity set of the same cls (hence `cls` field is absent)
        // NOTE: assumes that only one entry of this kind is present => gets the first one
        get parentEntitySetReference() {
            return this.inSet.find((item) => item._id && !item.cls);
        }
    };
}
function InMemoryEntitySetMixin(superclass) {
    return class InMemoryEntitySetMixin extends superclass {
        containsEntity(entity) {
            var _a;
            return Boolean((_a = entity === null || entity === void 0 ? void 0 : entity.inSet) === null || _a === void 0 ? void 0 : _a.some((ref) => ref._id === this.id));
        }
    };
}
