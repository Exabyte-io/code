"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtimeItemsStringSchemaMixin = runtimeItemsStringSchemaMixin;
function runtimeItemsStringSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get preProcessors() {
            return this.requiredProp("preProcessors");
        },
        set preProcessors(value) {
            this.setProp("preProcessors", value);
        },
        get postProcessors() {
            return this.requiredProp("postProcessors");
        },
        set postProcessors(value) {
            this.setProp("postProcessors", value);
        },
        get monitors() {
            return this.requiredProp("monitors");
        },
        set monitors(value) {
            this.setProp("monitors", value);
        },
        get results() {
            return this.requiredProp("results");
        },
        set results(value) {
            this.setProp("results", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
