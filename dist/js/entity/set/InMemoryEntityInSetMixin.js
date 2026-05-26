"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inMemoryEntityInSetMixin = inMemoryEntityInSetMixin;
const InSetSchemaMixin_1 = require("../../generated/InSetSchemaMixin");
function inMemoryEntityInSetMixin(item) {
    (0, InSetSchemaMixin_1.inSetSchemaMixin)(item);
    // @ts-expect-error
    const properties = {
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
