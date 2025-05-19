"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitySetType = void 0;
exports.inMemoryEntitySetBaseMixin = inMemoryEntitySetBaseMixin;
exports.default = InMemoryEntitySetBaseMixin;
var EntitySetType;
(function (EntitySetType) {
    EntitySetType["ordered"] = "ordered";
    EntitySetType["unordered"] = "unordered";
})(EntitySetType || (exports.EntitySetType = EntitySetType = {}));
function schemaMixin(item) {
    const schema = {
        get isEntitySet() {
            return item.prop("isEntitySet", false);
        },
        get entitySetType() {
            return item.prop("entitySetType", EntitySetType.unordered);
        },
        get entityCls() {
            return item.prop("entityCls");
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));
    return schema;
}
function methodsMixin(item) {
    const originalCls = item.cls;
    const methods = {
        get cls() {
            return item.entityCls || originalCls;
        },
        toJSONForInclusionInEntity() {
            const { _id, type } = item.toJSON();
            return { _id, type };
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(methods));
    return methods;
}
function inMemoryEntitySetBaseMixin(item) {
    schemaMixin(item);
    methodsMixin(item);
}
function InMemoryEntitySetBaseMixin(superclass) {
    class InMemoryEntitySetBaseMixin extends superclass {
        constructor(...args) {
            super(...args);
            inMemoryEntitySetBaseMixin(this);
        }
    }
    return InMemoryEntitySetBaseMixin;
}
