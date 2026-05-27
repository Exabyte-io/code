"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneClass = cloneClass;
function cloneClass(classToClone) {
    return Object.assign(Object.create(Object.getPrototypeOf(classToClone)), classToClone);
}
