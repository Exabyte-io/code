"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankableEntityMixin = bankableEntityMixin;
const BankableSchemaMixin_1 = require("../../generated/BankableSchemaMixin");
const HashedEntityMixin_1 = require("./HashedEntityMixin");
function bankableEntityMixin(item) {
    (0, BankableSchemaMixin_1.bankableSchemaMixin)(item);
    (0, HashedEntityMixin_1.hashedEntityMixin)(item);
}
