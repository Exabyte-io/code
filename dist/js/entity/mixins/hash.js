"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashedEntityMixin = HashedEntityMixin;
const hash_1 = require("../../utils/hash");
function HashedEntityMixin(superclass) {
    return class extends superclass {
        /*
         * @summary Returns an object based on meaningful fields for this unit, that will be used to calculate the hash
         *          Must be overridden.
         */
        // eslint-disable-next-line class-methods-use-this
        getHashObject() {
            return {};
        }
        /**
         * @summary Calculates hash based on meaningful fields and unit-specific fields. Unit-specific fields are
         *          separated into _typeSpecificHash function which can be overwritten by child classes.
         *          head and next are also important but not considered since they are included in subworkflow hash.
         */
        calculateHash() {
            return (0, hash_1.calculateHashFromObject)(this.getHashObject());
        }
    };
}
