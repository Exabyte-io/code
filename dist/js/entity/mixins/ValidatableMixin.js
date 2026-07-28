"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatableEntityMixin = validatableEntityMixin;
const omit_1 = __importDefault(require("lodash/omit"));
const clone_1 = require("../../utils/clone");
const in_memory_1 = require("../in_memory");
const validateEntityData_1 = require("../validateEntityData");
const validatableEntityMixinApplied = Symbol("validatableEntityMixinApplied");
function validatableEntityStaticMixin(Item) {
    // @ts-expect-error — assigning mixin statics onto constructor
    const staticProperties = {
        allowJsonSchemaTypesCoercing: false,
        validateData(data, clean, jsonSchema) {
            return (0, validateEntityData_1.validateEntityData)(data, jsonSchema !== null && jsonSchema !== void 0 ? jsonSchema : this.jsonSchema, {
                clean: clean !== null && clean !== void 0 ? clean : false,
                coerceTypes: this.allowJsonSchemaTypesCoercing,
            });
        },
    };
    Object.defineProperties(Item, Object.getOwnPropertyDescriptors(staticProperties));
}
function validatableEntityInstanceMixin(item) {
    // @ts-expect-error — assigning mixin instance methods onto prototype
    const properties = {
        validate() {
            const ctr = this.constructor;
            if (this._json) {
                ctr.validateData(this._json);
            }
        },
        isValid() {
            try {
                this.validate();
                return true;
            }
            catch (_a) {
                return false;
            }
        },
        clean(config) {
            var _a, _b, _c;
            try {
                const ctr = this.constructor;
                return ctr.validateData(config, true);
            }
            catch (err) {
                if (err instanceof in_memory_1.EntityError) {
                    console.error({
                        error: JSON.stringify((_a = err.details) === null || _a === void 0 ? void 0 : _a.error),
                        json: JSON.stringify((_b = err.details) === null || _b === void 0 ? void 0 : _b.json),
                        schema: JSON.stringify((_c = err.details) === null || _c === void 0 ? void 0 : _c.schema),
                    });
                }
                throw err;
            }
        },
        toJSON(exclude = []) {
            const ctr = this.constructor;
            const json = ctr._isDeepCloneRequired
                ? (0, clone_1.deepClone)((0, omit_1.default)(this._json, exclude))
                : (0, clone_1.clone)((0, omit_1.default)(this._json, exclude));
            return this.clean(json);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
/**
 * Opt-in AJV validation for InMemoryEntity subclasses.
 *
 * Apply on the constructor (adds static + prototype members):
 *
 * ```ts
 * interface MyEntity extends Validatable {}
 * class MyEntity extends InMemoryEntity<MySchema> {
 *     static readonly jsonSchema = mySchema;
 * }
 * validatableEntityMixin(MyEntity);
 * ```
 *
 * Idempotent: safe to call more than once on the same class.
 */
function validatableEntityMixin(Item) {
    const ctor = Item;
    if (ctor[validatableEntityMixinApplied]) {
        return;
    }
    validatableEntityStaticMixin(Item);
    validatableEntityInstanceMixin(Item.prototype);
    ctor[validatableEntityMixinApplied] = true;
}
