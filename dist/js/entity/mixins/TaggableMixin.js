"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taggableMixin = taggableMixin;
function taggableMixin(item) {
    // @ts-expect-error
    const properties = {
        get tags() {
            return this.prop("tags", []);
        },
        set tags(array) {
            this.setProp("tags", array);
        },
        setTags(array) {
            this.tags = array.filter((value, index, self) => self.indexOf(value) === index);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
