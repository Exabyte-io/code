"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taggableMixin = taggableMixin;
const TaggableSchemaMixin_1 = require("../../generated/TaggableSchemaMixin");
function taggableMixin(item) {
    (0, TaggableSchemaMixin_1.taggableSchemaMixin)(item);
    // @ts-expect-error
    const properties = {
        setTags(array) {
            this.tags = array.filter((value, index, self) => self.indexOf(value) === index);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
