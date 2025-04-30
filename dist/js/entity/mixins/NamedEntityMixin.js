"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.namedEntityMixin = namedEntityMixin;
exports.default = NamedEntityMixin;
function schemaMixin(item) {
    const schema = {
        get name() {
            return item.prop("name", "");
        },
        set name(name) {
            item.setProp("name", name);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));
    return schema;
}
function propertiesMixin(item) {
    const properties = {
        setName(name) {
            item.setProp("name", name);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function namedEntityMixin(item) {
    return {
        ...schemaMixin(item),
        ...propertiesMixin(item),
    };
}
function NamedEntityMixin(superclass) {
    class NamedEntityMixin extends superclass {
        constructor(...args) {
            super(...args);
            namedEntityMixin(this);
        }
    }
    return NamedEntityMixin;
}
