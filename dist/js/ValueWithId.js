"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundedValueWithId = exports.defaultRoundingOptions = exports.ValueWithId = void 0;
const math_1 = require("./math");
class ValueWithId {
    static fromValueAndId(value, id = 0) {
        return new this({ id, value });
    }
    constructor({ id, value } = ValueWithId.defaultConfig) {
        this.id = id;
        this.value = value;
    }
    /**
     * Converts the instance to a plain JavaScript object.
     */
    toJSON() {
        if (this.value !== null &&
            typeof this.value === "object" &&
            "toJSON" in this.value &&
            typeof this.value.toJSON === "function") {
            return { id: this.id, value: this.value.toJSON() };
        }
        return { id: this.id, value: this.value };
    }
    /**
     * Checks if this instance is equal to another ValueWithId.
     */
    equals(other) {
        if (!(other instanceof ValueWithId))
            return false;
        // because U may differ from T, we cast to unknown when comparing
        const v1 = this.value;
        const v2 = other.value;
        if (Array.isArray(v1) && Array.isArray(v2)) {
            if (v1.length !== v2.length)
                return false;
            for (let i = 0; i < v1.length; i++) {
                if (v1[i] !== v2[i])
                    return false;
            }
            return this.id === other.id;
        }
        return this.id === other.id && v1 === v2;
    }
}
exports.ValueWithId = ValueWithId;
ValueWithId.defaultConfig = {
    id: 0,
    value: null,
};
exports.defaultRoundingOptions = {
    precision: 9,
    roundingMethod: math_1.RoundingMethodEnum.HalfAwayFromZero,
};
class RoundedValueWithId extends ValueWithId {
    constructor(id, value, options = exports.defaultRoundingOptions) {
        super({ id, value });
        this.precision = options.precision;
        this.roundingMethod = options.roundingMethod;
    }
    toJSON() {
        return {
            id: this.id,
            value: math_1.math.roundArrayOrNumber(this.value, this.precision, this.roundingMethod),
        };
    }
}
exports.RoundedValueWithId = RoundedValueWithId;
