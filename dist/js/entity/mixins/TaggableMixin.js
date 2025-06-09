"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taggableMixin = taggableMixin;
exports.default = TaggableMixin;
function schemaMixin(item) {
    const schema = {
        get tags() {
            return item.prop("tags", []);
        },
        set tags(array) {
            item.setProp("tags", array);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));
    return schema;
}
function propertiesMixin(item) {
    const properties = {
        setTags(array) {
            item.tags = array.filter((value, index, self) => self.indexOf(value) === index);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function taggableMixin(item) {
    return {
        ...schemaMixin(item),
        ...propertiesMixin(item),
    };
}
function TaggableMixin(superclass) {
    class TaggableMixin extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args) {
            super(...args);
            taggableMixin(this);
        }
    }
    return TaggableMixin;
}
