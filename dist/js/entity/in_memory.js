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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryEntity = exports.EntityError = exports.ValidationErrorCode = void 0;
const ajv = __importStar(require("@mat3ra/esse/dist/js/utils/ajv"));
const get_1 = __importDefault(require("lodash/get"));
const omit_1 = __importDefault(require("lodash/omit"));
const set_1 = __importDefault(require("lodash/set"));
const clone_1 = require("../utils/clone");
var ValidationErrorCode;
(function (ValidationErrorCode) {
    ValidationErrorCode["IN_MEMORY_ENTITY_DATA_INVALID"] = "IN_MEMORY_ENTITY_DATA_INVALID";
    ValidationErrorCode["ENTITY_REFERENCE_ERROR"] = "ENTITY_REFERENCE_ERROR";
})(ValidationErrorCode || (exports.ValidationErrorCode = ValidationErrorCode = {}));
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
     */
    prop(name, defaultValue) {
        // `lodash.get` gets `null` when the value is `null`, but we still want a default value in this case, hence `||`
        return (0, get_1.default)(this._json, name, defaultValue) || defaultValue;
    }
    /**
     * @summary Set a prop
     */
    setProp(name, value) {
        // lodash.set is required to support dot-notation in keys (e.g. "compute.cluster.fqdn")
        (0, set_1.default)(this._json, name, value);
    }
    /**
     * @summary Remove a prop
     */
    unsetProp(name) {
        delete this._json[name];
    }
    /**
     * Updates internal JSON. Works the same as Mongo's $set operator
     * @see https://www.mongodb.com/docs/manual/reference/operator/update/set/#-set
     */
    setProps(json = {}) {
        Object.entries(json).forEach(([key, value]) => this.setProp(key, value));
        return this;
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
        return new this.constructor({
            ...this.toJSON(),
            ...extraContext,
        });
    }
    static validateData(data, clean = false, jsonSchema = this.jsonSchema) {
        if (!jsonSchema) {
            return data;
        }
        const result = clean
            ? ajv.validateAndClean(data, jsonSchema, {
                coerceTypes: this.allowJsonSchemaTypesCoercing,
            })
            : ajv.validate(data, jsonSchema);
        if (!result.isValid) {
            throw new EntityError({
                code: ValidationErrorCode.IN_MEMORY_ENTITY_DATA_INVALID,
                details: {
                    error: result === null || result === void 0 ? void 0 : result.errors,
                    json: data,
                    schema: jsonSchema,
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
        var _a, _b, _c;
        try {
            return this.constructor.validateData(config, true);
        }
        catch (err) {
            if (err instanceof EntityError) {
                console.error({
                    error: JSON.stringify((_a = err.details) === null || _a === void 0 ? void 0 : _a.error),
                    json: JSON.stringify((_b = err.details) === null || _b === void 0 ? void 0 : _b.json),
                    schema: JSON.stringify((_c = err.details) === null || _c === void 0 ? void 0 : _c.schema),
                });
            }
            throw err;
        }
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
    getAsEntityReference(byIdOnly = false) {
        if (!this.id) {
            throw new EntityError({
                code: ValidationErrorCode.ENTITY_REFERENCE_ERROR,
                details: {
                    json: this._json,
                    schema: this.constructor.jsonSchema || {},
                },
            });
        }
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
    // Properties from BaseInMemoryEntitySchema
    get id() {
        return this.prop("_id", "");
    }
    set id(id) {
        this.setProp("_id", id);
    }
    get _id() {
        return this.prop("_id", "");
    }
    set _id(id) {
        this.setProp("_id", id);
    }
    get schemaVersion() {
        return this.prop("schemaVersion", "");
    }
    set schemaVersion(schemaVersion) {
        this.setProp("schemaVersion", schemaVersion);
    }
    get systemName() {
        return this.prop("systemName", "");
    }
    set systemName(systemName) {
        this.setProp("systemName", systemName);
    }
    get slug() {
        return this.prop("slug", "");
    }
    get isSystemEntity() {
        return Boolean(this.systemName);
    }
}
exports.InMemoryEntity = InMemoryEntity;
// Override if deepClone of config is required
InMemoryEntity._isDeepCloneRequired = false;
InMemoryEntity.allowJsonSchemaTypesCoercing = false;
