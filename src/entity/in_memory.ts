import { addAdditionalPropertiesToSchema } from "@mat3ra/esse/lib/js/esse/schemaUtils";
import { EntityReferenceSchema } from "@mat3ra/esse/lib/js/types";
import Ajv, { SchemaObject } from "ajv";
import getValue from "lodash/get";
import omit from "lodash/omit";

import { clone, deepClone } from "../utils/clone";

export enum ValidationErrorCode {
    IN_MEMORY_ENTITY_AJV_INTERNAL_ERROR = "IN_MEMORY_ENTITY_AJV_INTERNAL_ERROR",
    IN_MEMORY_ENTITY_DATA_INVALID = "IN_MEMORY_ENTITY_DATA_INVALID",
}

export interface AnyObject {
    [key: string]: unknown;
}

export class EntityError extends Error {
    code: string;

    error?: object | null;

    constructor({ code, error }: { code: ValidationErrorCode; error?: object | null }) {
        super(code);
        this.code = code;
        this.error = error;
    }
}

const ajv = new Ajv({
    removeAdditional: true,
    strict: false,
    useDefaults: true,
    /**
     * discriminator fixes default values in oneOf
     * @see https://ajv.js.org/guide/modifying-data.html#assigning-defaults
     */
    discriminator: true,
    coerceTypes: true, // convert "true" => true for boolean or "4" => 4 for integer
});

export class InMemoryEntity {
    static create(config: object) {
        return new (this.prototype.constructor as typeof InMemoryEntity)(config);
    }

    // Override if deepClone of config is required
    static _isDeepCloneRequired = false;

    static readonly jsonSchema?: SchemaObject;

    _json: AnyObject = {};

    constructor(config = {}) {
        this._json = (this.constructor as typeof InMemoryEntity)._isDeepCloneRequired
            ? deepClone(config)
            : clone(config);
    }

    prop<T = null>(name: string, defaultValue?: T): T;

    /**
     * @summary Return a prop or the default
     * @returns {*}
     */
    prop<T>(name: string, defaultValue: T | null = null): unknown {
        // `lodash.get` gets `null` when the value is `null`, but we still want a default value in this case, hence `||`
        return getValue(this._json, name, defaultValue) || defaultValue;
    }

    /**
     * @summary Set a prop
     */
    setProp(name: string, value: unknown) {
        this._json[name] = value;
    }

    /**
     * @summary Remove a prop
     */
    unsetProp(name: string) {
        delete this._json[name];
    }

    /**
     * @summary Array of fields to exclude from resulted JSON
     */
    toJSON(exclude: string[] = []) {
        return (this.constructor as typeof InMemoryEntity)._isDeepCloneRequired
            ? this.toJSONSafe(exclude)
            : this.toJSONQuick(exclude);
    }

    toJSONSafe(exclude: string[] = []): AnyObject {
        return this.clean(deepClone(omit(this._json, exclude)));
    }

    toJSONQuick(exclude: string[] = []): AnyObject {
        return this.clean(clone(omit(this._json, exclude)));
    }

    /**
     * @summary Clone this entity
     */
    clone(extraContext?: object): this {
        type ThisType = typeof this;
        type ThisConstructor = { new (o: object): ThisType };

        const object = new (this.constructor as ThisConstructor)({
            ...this.toJSON(),
            ...extraContext,
        });

        return object;
    }

    private static getAjvValidator() {
        if (!this.jsonSchema) {
            return;
        }

        const schemaKey = this.jsonSchema.$id || this.cls;

        let validate = ajv.getSchema(schemaKey);

        if (!validate) {
            ajv.addSchema(addAdditionalPropertiesToSchema(this.jsonSchema), schemaKey);
            validate = ajv.getSchema(schemaKey);
        }

        if (!validate) {
            throw new EntityError({
                code: ValidationErrorCode.IN_MEMORY_ENTITY_AJV_INTERNAL_ERROR,
            });
        }

        return validate;
    }

    static validateAndCleanData(data: AnyObject) {
        const validator = this.getAjvValidator();
        const isValid = validator ? validator(data) : true;
        if (!isValid) {
            throw new EntityError({
                code: ValidationErrorCode.IN_MEMORY_ENTITY_DATA_INVALID,
                error: validator?.errors,
            });
        }
        return data;
    }

    /**
     * @summary Validate entity contents against schema
     */
    validate() {
        const ctr = this.constructor as typeof InMemoryEntity;
        if (this._json) {
            ctr.validateAndCleanData(this._json);
        }
    }

    clean(config: AnyObject) {
        return (this.constructor as typeof InMemoryEntity).validateAndCleanData(config);
    }

    isValid(): boolean {
        try {
            this.validate();
            return true;
        } catch (err) {
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
    getAsEntityReference(byIdOnly = false): EntityReferenceSchema {
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
    getEntityByName(entities: InMemoryEntity[], entity: string, name: string) {
        let filtered;
        if (!name) {
            filtered = entities.filter((ent) => ent.prop("isDefault") === true);
            if (!filtered.length) filtered = [entities[0]];
        } else {
            filtered = entities.filter((ent) => ent.prop("name") === name);
        }
        if (filtered.length !== 1) {
            console.log(`found ${filtered.length} entity ${entity} with name ${name} expected 1`);
        }
        return filtered[0];
    }
}

export type InMemoryEntityConstructor<T extends InMemoryEntity = InMemoryEntity> = new (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
) => T;
