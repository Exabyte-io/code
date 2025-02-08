"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = deepClone;
exports.clone = clone;
// TODO: consider other options for performance reasons - http://jsben.ch/bWfk9
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function clone(obj) {
    return { ...obj };
}
