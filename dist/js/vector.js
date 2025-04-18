"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundedVector3D = exports.Vector3D = void 0;
const math_1 = require("./math");
class Vector3D {
    constructor(value) {
        if (
            !Array.isArray(value) ||
            value.length !== 3 ||
            !value.every((v) => typeof v === "number")
        ) {
            throw new Error("Vector3D must be a tuple of exactly 3 numbers.");
        }
        this._value = [...value];
    }
    get value() {
        return this._value;
    }
    get x() {
        return this._value[0];
    }
    get y() {
        return this._value[1];
    }
    get z() {
        return this._value[2];
    }
    equals(other) {
        if (Array.isArray(other)) {
            if (other.length !== 3) {
                throw new Error("Input must be a 3-element array.");
            }
            other = other;
        }
        const arr1 = this._value;
        const arr2 = other instanceof Vector3D ? other.value : other;
        return math_1.math.vEqualWithTolerance(arr1, arr2, Vector3D.atol);
    }
    get norm() {
        return math_1.math.vlen(this._value);
    }
}
exports.Vector3D = Vector3D;
Vector3D.atol = 1e-8;
class RoundedVector3D extends Vector3D {
    toJSON(skipRounding = false) {
        const rounded = skipRounding
            ? this.value
            : math_1.math.roundArrayOrNumber(this.value, RoundedVector3D.roundPrecision);
        return [...rounded];
    }
    get value_rounded() {
        return this.toJSON();
    }
    get x_rounded() {
        return this.value_rounded[0];
    }
    get y_rounded() {
        return this.value_rounded[1];
    }
    get z_rounded() {
        return this.value_rounded[2];
    }
    equals(other) {
        const arr1 = this.value_rounded;
        const arr2 = Array.isArray(other)
            ? new RoundedVector3D(other).value_rounded
            : other.value_rounded;
        const atol = RoundedVector3D.atol || 10 ** -RoundedVector3D.roundPrecision;
        return math_1.math.vEqualWithTolerance(arr1, arr2, atol);
    }
    get norm_rounded() {
        return math_1.math.roundArrayOrNumber(this.norm, RoundedVector3D.roundPrecision);
    }
}
exports.RoundedVector3D = RoundedVector3D;
RoundedVector3D.roundPrecision = 9;
