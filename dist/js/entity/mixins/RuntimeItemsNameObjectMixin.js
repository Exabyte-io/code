"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtimeItemsNameObjectMixin = runtimeItemsNameObjectMixin;
const RuntimeItemsNameObjectSchemaMixin_1 = require("../../generated/RuntimeItemsNameObjectSchemaMixin");
function runtimeItemsNameObjectMixin(item) {
    (0, RuntimeItemsNameObjectSchemaMixin_1.runtimeItemsNameObjectSchemaMixin)(item);
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
