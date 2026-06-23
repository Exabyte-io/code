"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankableSchemaMixin = bankableSchemaMixin;
function bankableSchemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get exabyteId() {
            return this.requiredProp("exabyteId");
        },
        set exabyteId(value) {
            this.setProp("exabyteId", value);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
