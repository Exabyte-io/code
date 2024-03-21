Object.defineProperty(exports, "__esModule", { value: true });
exports.assertArray = exports.assertObject = void 0;
const chai_1 = require("chai");

function assertObject(prop) {
    (0, chai_1.expect)(prop).to.be.an("object");
    return Boolean(prop) && typeof prop === "object" && !Array.isArray(prop);
}
exports.assertObject = assertObject;
function assertArray(prop) {
    (0, chai_1.expect)(prop).to.be.an("array");
    return Array.isArray(prop);
}
exports.assertArray = assertArray;
