"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.math = exports.roundArrayOrNumber = exports.roundCustom = exports.RoundingMethodEnum = void 0;
exports.numberToPrecision = numberToPrecision;
/* eslint-disable */
const mathjs_1 = __importDefault(require("mathjs"));
const underscore_1 = __importDefault(require("underscore"));
const constants_1 = require("./constants");
/**
 * @summary Zero threshold. Numbers below it are put to zero exactly.
 * Used to avoid math.js bug in treating zero as X.XXe-16.
 */
const EPSILON = 1e-8;
/**
 * @summary Returns scalar product of vectors
 * @param v1 Vector 1
 * @param v2 Vector 2
 */
const product = (v1, v2) => {
    if (v1.length !== v2.length) {
        throw new Error("Vectors must be of the same length");
    }
    return Number(exports.math.multiply(v1, exports.math.transpose(v2)));
};
/**
 * @summary Returns length of a vector.
 * @param v Vector
 */
const vlen = (v) => {
    return exports.math.sqrt(product(v, v));
};
/**
 * @summary Returns angle between `a` and `b` vectors.
 * @param a Vector a
 * @param b Vector b
 * @param unit `rad`, `deg`
 */
const angle = (a, b, unit) => {
    const lenA = vlen(a);
    const lenB = vlen(b);
    // @ts-ignore
    return exports.math.unit(exports.math.acos(product(a, b) / (lenA * lenB)), "rad").toNumber(unit || "deg");
};
const angleUpTo90 = (a, b, unit) => {
    const angleUpTo180 = angle(a, b, unit);
    return angleUpTo180 < 90 ? angleUpTo180 : 180 - angleUpTo180;
};
/**
 * @summary Returns distance between 2 vectors.
 * @param v1 {Number[]} Vector
 * @param v2 {Number[]} Vector
 * @return {Number}
 */
const vDist = (v1, v2) => {
    if (v1.length !== v2.length) {
        console.error("Attempting to calculate distance between vectors of different dimensionality");
        return;
    }
    return vlen(v1.map((coordinate, index) => coordinate - v2[index]));
};
/**
 * @summary Returns checks whether 2 vector are equal within tolerance.
 * @param vec1 {Number[]} Vector
 * @param vec2 {Number[]} Vector
 * @param tolerance {Number} Tolerance
 * @return {Number}
 */
const vEqualWithTolerance = (vec1, vec2, tolerance = constants_1.tolerance.pointsDistance) => {
    const val = vDist(vec1, vec2);
    if (typeof val === "undefined") {
        return false;
    }
    // @ts-ignore
    return val <= tolerance;
};
/**
 * @summary Returns 0 if passed number is less than Made.math.EPSILON.
 * @param n {Number}
 * @return {Number}
 */
const roundToZero = (n) => {
    return Math.abs(n) < EPSILON ? 0 : n;
};
/**
 * @summary Returns number with specified precision.
 */
const precise = (x, n = 7) => {
    return Number(x.toPrecision(n));
};
/**
 * @summary Returns mod of the passed value with the specified tolerance.
 */
const mod = (num, tolerance = 0.001) => {
    const m = num % 1;
    const x = num >= 0 ? m : 1 + m;
    if (exports.math.smallerEq(Math.abs(x - 1), tolerance) || exports.math.smallerEq(Math.abs(x), tolerance)) {
        return 0;
    }
    return x;
};
/**
 * @summary Returns cartesian of passed arrays.
 * @example combinations([1,2], [4,5], [6]) = [[1,4,6], [1,5,6], [2,4,6], [2,5,6]];
 */
const cartesianProduct = (...arg) => {
    const r = [];
    const max = arg.length - 1;
    const helper = (arr, i) => {
        for (let j = 0, l = arg[i].length; j < l; j++) {
            const a = arr.slice(0); // clone arr
            a.push(arg[i][j]);
            if (i === max) {
                r.push(a);
            }
            else {
                helper(a, i + 1);
            }
        }
    };
    helper([], 0);
    return r;
};
/**
 * @summary Returns all possible positive integer combinations where each value changes from 0 to a, b, c.
 */
const almostEqual = (a, b, tolerance = constants_1.tolerance.pointsDistance) => {
    return Math.abs(a - b) < tolerance;
};
/**
 * @summary Returns true if number is 0 <= x < 1, inclusive, otherwise false.
 * Helper to deal with JS arithmetic artifacts.
 */
const isBetweenZeroInclusiveAndOne = (number, tolerance = constants_1.tolerance.length) => {
    return roundToZero(number) >= 0 && !almostEqual(number, 1, tolerance) && number < 1;
};
/**
 * @summary Returns all possible positive integer combinations where each value changes from 0 to a, b, c.
 * @example
 *   var comb = combinations(1, 2, 0);
 *   // [[0, 0, 0], [0, 1, 0], [0, 2, 0], [1, 0, 0], [1, 1, 0], [1, 2, 0]]
 * @param a
 * @param b
 * @param c
 */
const combinations = (a, b, c) => {
    const combs = [];
    for (let i = 0; i <= a; i++) {
        for (let j = 0; j <= b; j++) {
            for (let k = 0; k <= c; k++) {
                combs.push([i, j, k]);
            }
        }
    }
    return combs;
};
/*
 * @summary Same as `combinations` but accepting intervals (tuples) of integers: eg. [-3, 4]
 */
const combinationsFromIntervals = (arrA, arrB, arrC) => {
    const combs = [];
    for (let i = arrA[0]; i <= arrA[1]; i++) {
        for (let j = arrB[0]; j <= arrB[1]; j++) {
            for (let k = arrC[0]; k <= arrC[1]; k++) {
                combs.push([i, j, k]);
            }
        }
    }
    return combs;
};
const roundValueToNDecimals = (value, decimals = 3) => {
    return parseFloat(value.toFixed(decimals));
};
// See: https://en.wikipedia.org/wiki/Rounding
var RoundingMethodEnum;
(function (RoundingMethodEnum) {
    RoundingMethodEnum["Bankers"] = "bankers";
    RoundingMethodEnum["HalfAwayFromZero"] = "halfAwayFromZero";
})(RoundingMethodEnum || (exports.RoundingMethodEnum = RoundingMethodEnum = {}));
const roundCustom = (value, decimals = 0, method = RoundingMethodEnum.HalfAwayFromZero) => {
    const factor = Math.pow(10, decimals);
    const scaledValue = value * factor;
    const absValue = Math.abs(scaledValue);
    const sign = scaledValue < 0 ? -1 : 1;
    let roundedAbs;
    switch (method) {
        case RoundingMethodEnum.HalfAwayFromZero:
            roundedAbs = Math.round(absValue);
            break;
        case RoundingMethodEnum.Bankers:
            const floorValue = Math.floor(absValue);
            const fractional = absValue - floorValue;
            if (Math.abs(fractional - 0.5) < Number.EPSILON) {
                // Round to even
                roundedAbs = floorValue % 2 === 0 ? floorValue : floorValue + 1;
            }
            else {
                roundedAbs = Math.round(absValue);
            }
            break;
        default:
            throw new Error(`Unsupported rounding method: ${method}`);
    }
    return (roundedAbs * sign) / factor;
};
exports.roundCustom = roundCustom;
const roundArrayOrNumber = (value, decimals = 9, method = RoundingMethodEnum.HalfAwayFromZero) => {
    if (Array.isArray(value)) {
        return value.map((v) => (typeof v === "number" ? (0, exports.roundCustom)(v, decimals, method) : v));
    }
    return typeof value === "number" ? (0, exports.roundCustom)(value, decimals, method) : value;
};
exports.roundArrayOrNumber = roundArrayOrNumber;
/**
 * @summary Returns n splits of the passed segment.
 */
const calculateSegmentsBetweenPoints3D = (point1, point2, n) => {
    // safely parse if passed strings
    const point1_ = point1.map((x) => (typeof x === "string" ? parseFloat(x) : x));
    const point2_ = point2.map((x) => (typeof x === "string" ? parseFloat(x) : x));
    const n_ = typeof n === "string" ? parseInt(n) : n;
    const result = [];
    for (let i = 1; i < n_; i++) {
        const lambda = i / (n_ - i);
        result.push([
            (point1_[0] + lambda * point2_[0]) / (1 + lambda),
            (point1_[1] + lambda * point2_[1]) / (1 + lambda),
            (point1_[2] + lambda * point2_[2]) / (1 + lambda),
        ]);
    }
    return result;
};
/**
 * @summary Wrapper for native [Number.toPrecision](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Number/toPrecision) method.
 * Returns a string representing the Number object to the specified precision.
 * @memberOf Helpers
 * @package exabyte:core
 * @locus Client
 * @method
 * @name toPrecision
 * @param number
 * @param precision Optional. An integer specifying the number of significant digits.
 */
function numberToPrecision(number, precision) {
    if (underscore_1.default.isNumber(number)) {
        return number.toPrecision(precision);
    }
    return number;
}
exports.math = {
    ...mathjs_1.default,
    PI: Math.PI,
    trunc: Math.trunc,
    product,
    vlen,
    angle,
    angleUpTo90,
    vDist,
    vEqualWithTolerance,
    mod,
    isBetweenZeroInclusiveAndOne,
    cartesianProduct,
    almostEqual,
    combinations,
    combinationsFromIntervals,
    calculateSegmentsBetweenPoints3D,
    roundToZero,
    precise,
    roundValueToNDecimals,
    numberToPrecision,
    roundCustom: exports.roundCustom,
    RoundingMethod: RoundingMethodEnum,
    roundArrayOrNumber: exports.roundArrayOrNumber,
};
