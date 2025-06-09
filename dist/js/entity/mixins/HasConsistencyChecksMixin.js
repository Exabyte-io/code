"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasConsistencyChecksMixin = hasConsistencyChecksMixin;
exports.default = HasConsistencyChecksMixin;
function schemaMixin(item) {
    const schema = {
        get consistencyChecks() {
            return item.prop("consistencyChecks", []);
        },
        set consistencyChecks(array) {
            item.setProp("consistencyChecks", array);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));
    return schema;
}
function propertiesMixin(item) {
    const properties = {
        addConsistencyChecks(array) {
            item.consistencyChecks = [...(item.consistencyChecks || []), ...array];
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function hasConsistencyChecksMixin(item) {
    return {
        ...schemaMixin(item),
        ...propertiesMixin(item),
    };
}
function HasConsistencyChecksMixin(superclass) {
    class HasConsistencyChecksMixin extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args) {
            super(...args);
            hasConsistencyChecksMixin(this);
        }
    }
    return HasConsistencyChecksMixin;
}
