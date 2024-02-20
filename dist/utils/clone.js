"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = exports.deepClone = void 0;
// TODO: consider other options for performance reasons - http://jsben.ch/bWfk9
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.deepClone = deepClone;
function clone(obj) {
    return { ...obj };
}
exports.clone = clone;
