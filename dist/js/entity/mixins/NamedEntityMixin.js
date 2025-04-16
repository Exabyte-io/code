"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NamedEntityMixin;
function props(item) {
    return Object.assign(item, {
        get name() {
            return item.prop("name", "");
        },
        set name(name) {
            item.setProp("name", name);
        },
    });
}
function methods(item) {
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
            props(this);
            methods(this);
        }
    }
    return NamedEntityMixin;
}
