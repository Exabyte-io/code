"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUUID = getUUID;
const uuid_1 = require("uuid");
function getUUID() {
    return (0, uuid_1.v4)();
}
