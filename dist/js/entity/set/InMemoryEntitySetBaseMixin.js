"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inMemoryEntitySetBaseMixin = inMemoryEntitySetBaseMixin;
exports.default = InMemoryEntitySetBaseMixin;
function inMemoryEntitySetBaseMixin(item) {
    const properties = {
        get isEntitySet() {
            return item.prop("isEntitySet", false);
        },
        get entitySetType() {
            return item.prop("entitySetType");
        },
        get entityCls() {
            return item.prop("entityCls");
        },
        get cls() {
            return this.entityCls || item.cls;
        },
        toJSONForInclusionInEntity() {
            const { _id, type } = item.toJSON();
            return { _id, type };
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
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
