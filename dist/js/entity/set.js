"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryEntitySet = void 0;
const in_memory_1 = require("./in_memory");
const InMemoryEntitySetBaseMixin_1 = __importDefault(require("./set/InMemoryEntitySetBaseMixin"));
const mixins_1 = require("./set/mixins");
class InMemoryEntitySet extends (0, mixins_1.InMemoryEntitySetMixin)((0, mixins_1.InMemoryEntityInSetMixin)((0, InMemoryEntitySetBaseMixin_1.default)(in_memory_1.InMemoryEntity))) {
}
exports.InMemoryEntitySet = InMemoryEntitySet;
