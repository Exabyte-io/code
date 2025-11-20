"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultableEntityMixin = defaultableEntityMixin;
const DefaultableSchemaMixin_1 = require("../../generated/DefaultableSchemaMixin");
function defaultableEntityStaticMixin(Item) {
    // @ts-expect-error
    const staticProperties = {
        createDefault() {
            return new this(this.defaultConfig);
        },
    };
    Object.defineProperties(Item, Object.getOwnPropertyDescriptors(staticProperties));
    return staticProperties;
}
function defaultableEntityMixin(Item) {
    (0, DefaultableSchemaMixin_1.defaultableSchemaMixin)(Item.prototype);
    defaultableEntityStaticMixin(Item);
}
