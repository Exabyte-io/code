import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import { BaseInMemoryEntitySchema, EntityReferenceSchema } from "@mat3ra/esse/dist/js/types";
import * as ajv from "@mat3ra/esse/dist/js/utils/ajv";
import getValue from "lodash/get";
import omit from "lodash/omit";
import set from "lodash/set";

import { clone, deepClone } from "../utils/clone";

export enum ValidationErrorCode {
    IN_MEMORY_ENTITY_DATA_INVALID = "IN_MEMORY_ENTITY_DATA_INVALID",
    ENTITY_REFERENCE_ERROR = "ENTITY_REFERENCE_ERROR",
}

interface ErrorDetails {
    error?: object | null;
    json: AnyObject;
    schema: JSONSchema;
}

export class EntityError extends Error {
    code: string;

    details?: ErrorDetails;

    constructor({ code, details }: { code: ValidationErrorCode; details?: ErrorDetails }) {
        super(code);
        this.code = code;
        this.details = details;
    }
}

export class InMemoryEntity implements BaseInMemoryEntitySchema {
    static create(config: object) {
        return new (this.prototype.constructor as typeof InMemoryEntity)(config);
    }

    // Override if deepClone of config is required
    static _isDeepCloneRequired = false;

    static allowJsonSchemaTypesCoercing = false;

    static readonly jsonSchema?: JSONSchema;

    _json: AnyObject = {};

    constructor(config = {}) {
        this._json = (this.constructor as typeof InMemoryEntity)._isDeepCloneRequired
            ? deepClone(config)
            : clone(config);
    }

    prop<T = undefined>(name: string, defaultValue: T): T;

    prop<T = undefined>(name: string): T | undefined;

    /**
     * @summary Return a prop or the default
     */
    prop<T = undefined>(name: string, defaultValue?: T): T | undefined {
        // `lodash.get` gets `null` when the value is `null`, but we still want a default value in this case, hence `||`
        return (getValue(this._json, name, defaultValue) as T) || defaultValue;
    }

    /**
     * @summary Set a prop
     */
    setProp(name: string, value: unknown) {
        // lodash.set is required to support dot-notation in keys (e.g. "compute.cluster.fqdn")
        set(this._json, name, value);
    }

    /**
     * @summary Remove a prop
     */
    unsetProp(name: string) {
        delete this._json[name];
    }

    /**
     * Updates internal JSON. Works the same as Mongo's $set operator
     * @see https://www.mongodb.com/docs/manual/reference/operator/update/set/#-set
     */
    setProps(json: AnyObject = {}) {
        Object.entries(json).forEach(([key, value]) => this.setProp(key, value));
        return this;
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

        return new (this.constructor as ThisConstructor)({
            ...this.toJSON(),
            ...extraContext,
        });
    }

    static validateData(data: AnyObject, clean = false, jsonSchema = this.jsonSchema) {
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
                    error: result?.errors,
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
        const ctr = this.constructor as typeof InMemoryEntity;
        if (this._json) {
            ctr.validateData(this._json);
        }
    }

    clean(config: AnyObject) {
        try {
            return (this.constructor as typeof InMemoryEntity).validateData(config, true);
        } catch (err) {
            if (err instanceof EntityError) {
                console.error({
                    error: JSON.stringify(err.details?.error),
                    json: JSON.stringify(err.details?.json),
                    schema: JSON.stringify(err.details?.schema),
                });
            }

            throw err;
        }
    }

    isValid(): boolean {
        try {
            this.validate();
            return true;
        } catch (err) {
            return false;
        }
    }

    static get cls(): string {
        return this.prototype.constructor.name;
    }

    get cls() {
        return this.constructor.name;
    }

    // TODO: figure out why the above getter for `cls` returns `null` and use only one
    getClsName() {
        return this.constructor.name;
    }

    /**
     * @summary get small identifying payload of object
     * @param byIdOnly if true, return only the id
     * @returns identifying data
     */
    getAsEntityReference(byIdOnly: true): { _id: string };

    getAsEntityReference(byIdOnly: false): Required<EntityReferenceSchema>;

    getAsEntityReference(byIdOnly = false) {
        if (!this.id) {
            throw new EntityError({
                code: ValidationErrorCode.ENTITY_REFERENCE_ERROR,
                details: {
                    json: this._json,
                    schema: (this.constructor as typeof InMemoryEntity).jsonSchema || {},
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

export type InMemoryEntityConstructor<T extends InMemoryEntity = InMemoryEntity> = new (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
) => T;
