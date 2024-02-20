"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderedInMemoryEntitySet = void 0;
const set_1 = require("../set");
const mixins_1 = require("./ordered/mixins");
exports.OrderedInMemoryEntitySet = (0, mixins_1.OrderedInMemoryEntitySetMixin)(
    (0, mixins_1.OrderedInMemoryEntityInSetMixin)(set_1.InMemoryEntitySet),
);
