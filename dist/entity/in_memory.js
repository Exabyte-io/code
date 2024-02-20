"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryEntity = exports.EntityError = exports.ValidationErrorCode = void 0;
const ajv = __importStar(require("@mat3ra/esse/lib/js/utils/ajv"));
const get_1 = __importDefault(require("lodash/get"));
const omit_1 = __importDefault(require("lodash/omit"));
const clone_1 = require("../utils/clone");
var ValidationErrorCode;
(function (ValidationErrorCode) {
    ValidationErrorCode["IN_MEMORY_ENTITY_DATA_INVALID"] = "IN_MEMORY_ENTITY_DATA_INVALID";
})(ValidationErrorCode = exports.ValidationErrorCode || (exports.ValidationErrorCode = {}));
class EntityError extends Error {
    constructor({ code, details }) {
        super(code);
        this.code = code;
        this.details = details;
    }
}
exports.EntityError = EntityError;
class InMemoryEntity {
    static create(config) {
        return new this.prototype.constructor(config);
    }
    constructor(config = {}) {
        this._json = {};
        this._json = this.constructor._isDeepCloneRequired
            ? (0, clone_1.deepClone)(config)
            : (0, clone_1.clone)(config);
    }
    /**
     * @summary Return a prop or the default
     * @returns {*}
     */
    prop(name, defaultValue = null) {
        // `lodash.get` gets `null` when the value is `null`, but we still want a default value in this case, hence `||`
        return (0, get_1.default)(this._json, name, defaultValue) || defaultValue;
    }
    /**
     * @summary Set a prop
     */
    setProp(name, value) {
        this._json[name] = value;
    }
    /**
     * @summary Remove a prop
     */
    unsetProp(name) {
        delete this._json[name];
    }
    /**
     * @summary Array of fields to exclude from resulted JSON
     */
    toJSON(exclude = []) {
        return this.constructor._isDeepCloneRequired
            ? this.toJSONSafe(exclude)
            : this.toJSONQuick(exclude);
    }
    toJSONSafe(exclude = []) {
        return this.clean((0, clone_1.deepClone)((0, omit_1.default)(this._json, exclude)));
    }
    toJSONQuick(exclude = []) {
        return this.clean((0, clone_1.clone)((0, omit_1.default)(this._json, exclude)));
    }
    /**
     * @summary Clone this entity
     */
    clone(extraContext) {
        const object = new this.constructor({
            ...this.toJSON(),
            ...extraContext,
        });
        return object;
    }
    static validateData(data, clean = false) {
        if (!this.jsonSchema) {
            return data;
        }
        const result = clean
            ? ajv.validateAndClean(data, this.jsonSchema, {
                coerceTypes: this.allowJsonSchemaTypesCoercing,
            })
            : ajv.validate(data, this.jsonSchema);
        if (!result.isValid) {
            throw new EntityError({
                code: ValidationErrorCode.IN_MEMORY_ENTITY_DATA_INVALID,
                details: {
                    error: result === null || result === void 0 ? void 0 : result.errors,
                    json: data,
                    schema: this.jsonSchema,
                },
            });
        }
        return data;
    }
    /**
     * @summary Validate entity contents against schema
     */
    validate() {
        const ctr = this.constructor;
        if (this._json) {
            ctr.validateData(this._json);
        }
    }
    clean(config) {
        return this.constructor.validateData(config, true);
    }
    isValid() {
        try {
            this.validate();
            return true;
        }
        catch (err) {
            return false;
        }
    }
    get id() {
        return this.prop("_id", "");
    }
    set id(id) {
        this.setProp("_id", id);
    }
    static get cls() {
        return this.prototype.constructor.name;
    }
    get cls() {
        return this.constructor.name;
    }
    // TODO: figure out why the above getter for `cls` returns `null` and use only one
    getClsName() {
        return this.constructor.name;
    }
    get slug() {
        return this.prop("slug", "");
    }
    get isSystemEntity() {
        return Boolean(this.prop("systemName", ""));
    }
    /**
     * @summary get small identifying payload of object
     * @param byIdOnly if true, return only the id
     * @returns identifying data
     */
    getAsEntityReference(byIdOnly = false) {
        if (byIdOnly) {
            return { _id: this.id };
        }
        return {
            _id: this.id,
            slug: this.slug,
            cls: this.getClsName(),
        };
    }
    /**
     * @summary Pluck an entity from a collection by name.
     *          If no name is provided and no entity has prop isDefault, return the first entity
     * @param entities the entities
     * @param entity the kind of entities
     * @param name the name of the entity to choose
     */
    // eslint-disable-next-line class-methods-use-this
    getEntityByName(entities, entity, name) {
        let filtered;
        if (!name) {
            filtered = entities.filter((ent) => ent.prop("isDefault") === true);
            if (!filtered.length)
                filtered = [entities[0]];
        }
        else {
            filtered = entities.filter((ent) => ent.prop("name") === name);
        }
        if (filtered.length !== 1) {
            console.log(`found ${filtered.length} entity ${entity} with name ${name} expected 1`);
        }
        return filtered[0];
    }
}
exports.InMemoryEntity = InMemoryEntity;
// Override if deepClone of config is required
InMemoryEntity._isDeepCloneRequired = false;
InMemoryEntity.allowJsonSchemaTypesCoercing = false;
