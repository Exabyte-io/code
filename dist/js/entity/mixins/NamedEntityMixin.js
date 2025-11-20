"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.namedEntityMixin = namedEntityMixin;
const NamedEntitySchemaMixin_1 = require("../../generated/NamedEntitySchemaMixin");
function namedEntityMixin(item) {
    (0, NamedEntitySchemaMixin_1.namedEntitySchemaMixin)(item);
    // @ts-expect-error
    const properties = {
        setName(name) {
            this.setProp("name", name);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
