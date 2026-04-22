"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtimeItemsMixin = runtimeItemsMixin;
const RuntimeItemsSchemaMixin_1 = require("../../generated/RuntimeItemsSchemaMixin");
function runtimeItemsPropertiesMixin(item) {
    // @ts-expect-error
    const properties = {
        get hashObjectFromRuntimeItems() {
            return {
                results: this.results,
                preProcessors: this.preProcessors,
                postProcessors: this.postProcessors,
            };
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
function runtimeItemsMixin(item) {
    (0, RuntimeItemsSchemaMixin_1.runtimeItemsSchemaMixin)(item);
    runtimeItemsPropertiesMixin(item);
}
