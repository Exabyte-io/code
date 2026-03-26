"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashedEntityMixin = hashedEntityMixin;
const hash_1 = require("../../utils/hash");
function hashedEntityMixin(item) {
    // @ts-expect-error
    const properties = {
        /**
         * @summary Calculates hash based on meaningful fields and unit-specific fields. Unit-specific fields are
         *          separated into _typeSpecificHash function which can be overwritten by child classes.
         *          head and next are also important but not considered since they are included in subworkflow hash.
         */
        calculateHash() {
            var _a, _b;
            return (0, hash_1.calculateHashFromObject)((_b = (_a = this.getHashObject) === null || _a === void 0 ? void 0 : _a.call(this)) !== null && _b !== void 0 ? _b : {});
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
