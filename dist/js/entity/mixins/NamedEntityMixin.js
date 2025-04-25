"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NamedEntityMixin;
function namedEntityMixin(item) {
    const schema = {
        get name() {
            return item.prop("name", "");
        },
        set name(name) {
            item.setProp("name", name);
        },
    };
    if (!("name" in item)) {
        Object.assign(item, schema);
    }
    return schema;
}
function namedEntityMethodsMixin(item) {
    return Object.assign(item, {
        setName(name) {
            item.setProp("name", name);
        },
    });
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
