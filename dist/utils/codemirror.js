"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshCodeMirror = void 0;
const forEach_1 = __importDefault(require("lodash/forEach"));
const refreshCodeMirror = (containerId) => {
    const container = document.getElementById(containerId);
    const editors =
        container === null || container === void 0
            ? void 0
            : container.getElementsByClassName("CodeMirror");
    // @ts-ignore
    (0, forEach_1.default)(editors, (cm) => cm.CodeMirror.refresh());
};
exports.refreshCodeMirror = refreshCodeMirror;
