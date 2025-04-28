"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NamedEntityMixin;
function namedEntityMixin(item) {
    const properties = {
        get name() {
            return item.prop("name", "");
        },
        set name(name) {
            item.setProp("name", name);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function namedEntityMethodsMixin(item) {
    const methods = {
        setName(name) {
            item.setProp("name", name);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(methods));
    return methods;
}
function NamedEntityMixin(superclass) {
    class NamedEntityMixin extends superclass {
        constructor(...args) {
            super(...args);
            namedEntityMixin(this);
            namedEntityMethodsMixin(this);
        }
    }
    return NamedEntityMixin;
}
