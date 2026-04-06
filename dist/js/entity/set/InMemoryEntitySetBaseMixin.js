"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitySetType = void 0;
exports.inMemoryEntitySetBaseMixin = inMemoryEntitySetBaseMixin;
var EntitySetType;
(function (EntitySetType) {
    EntitySetType["ordered"] = "ordered";
    EntitySetType["unordered"] = "unordered";
})(EntitySetType || (exports.EntitySetType = EntitySetType = {}));
function schemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get isEntitySet() {
            return this.prop("isEntitySet", false);
        },
        get entitySetType() {
            return this.prop("entitySetType", EntitySetType.unordered);
        },
        get entityCls() {
            return this.prop("entityCls");
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function methodsMixin(item) {
    const originalCls = item.cls;
    // @ts-expect-error
    const properties = {
        get cls() {
            return this.entityCls || originalCls;
        },
        toJSONForInclusionInEntity() {
            const { _id, type } = this.toJSON();
            return { _id, type };
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function inMemoryEntitySetBaseMixin(item) {
    schemaMixin(item);
    methodsMixin(item);
}
