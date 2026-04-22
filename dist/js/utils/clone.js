"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = deepClone;
exports.clone = clone;
function deepClone(obj) {
    return structuredClone(obj);
}
function clone(obj) {
    return { ...obj };
}
