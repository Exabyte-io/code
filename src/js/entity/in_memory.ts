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
    REQUIRED_PROPERTY_MISSING = "REQUIRED_PROPERTY_MISSING",
}

interface ErrorDetails {
    error?: object | null;
    json: object;
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

type Schema = BaseInMemoryEntitySchema;

export class InMemoryEntity<S extends Schema = Schema> implements Schema {
    static create<T extends InMemoryEntity<Schema>>(config: Schema): T {
        return new (this.prototype.constructor as InMemoryEntityConstructor<T>)(config);
    }

    // Override if deepClone of config is required
    static _isDeepCloneRequired = false;

    static allowJsonSchemaTypesCoercing = false;

    static readonly jsonSchema?: JSONSchema;

    _json: S;

    // NoInfer: keep default S (or an explicit type arg) instead of inferring S from the config literal.
    constructor(config: NoInfer<S>) {
        this._json = (this.constructor as typeof InMemoryEntity)._isDeepCloneRequired
            ? deepClone(config)
            : clone(config);
    }

    prop<K extends keyof S>(name: K, defaultValue: S[K]): S[K];

    prop<K extends keyof S>(name: K): S[K] | undefined;

    /**
     * @summary Return a prop or the default
     */
    prop<K extends keyof S>(name: K, defaultValue?: S[K]): S[K] | undefined {
        // `lodash.get` gets `null` when the value is `null`, but we still want a default value in this case, hence `??`
        return (getValue(this._json, name, defaultValue) as S[K] | undefined) ?? defaultValue;
    }

    /**
     * @summary Return a required prop, throwing an error if it doesn't exist or is undefined/null
     */
    requiredProp<K extends keyof S>(name: K): S[K] {
        const value = this.prop(name);
        if (value === undefined || value === null) {
            throw new EntityError({
                code: ValidationErrorCode.REQUIRED_PROPERTY_MISSING,
                details: {
                    error: null,
                    json: this._json,
                    schema: (this.constructor as typeof InMemoryEntity).jsonSchema || {},
                },
            });
        }
        return value;
    }

    /**
     * @summary Set a prop
     */
    setProp(name: keyof S, value: S[typeof name]) {
        // lodash.set is required to support dot-notation in keys (e.g. "compute.cluster.fqdn")
        set(this._json, name, value);
    }

    /**
     * @summary Remove a prop
     */
    unsetProp(name: keyof S) {
        delete this._json[name];
    }

    /**
     * Updates internal JSON. Works the same as Mongo's $set operator
     * @see https://www.mongodb.com/docs/manual/reference/operator/update/set/#-set
     */
    setProps(json: Partial<S> = {}) {
        Object.entries(json).forEach(([key, value]) => {
            const keyType = key as keyof S;
            this.setProp(keyType, value as S[typeof keyType]);
        });
        return this;
    }

    /**
     * @summary Array of fields to exclude from resulted JSON
     */
    toJSON(exclude: (keyof S)[] = []): S {
        return (this.constructor as typeof InMemoryEntity)._isDeepCloneRequired
            ? this.toJSONSafe(exclude)
            : this.toJSONQuick(exclude);
    }

    toJSONSafe(exclude: (keyof S)[] = []): S {
        return this.clean(deepClone(omit(this._json, exclude)));
    }

    toJSONQuick(exclude: (keyof S)[] = []): S {
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

    static validateData(data: object, clean = false, jsonSchema = this.jsonSchema) {
        if (!jsonSchema) {
            return data;
        }
        const result = clean
            ? ajv.validateAndClean(data as AnyObject, jsonSchema, {
                  coerceTypes: this.allowJsonSchemaTypesCoercing,
              })
            : ajv.validate(data as AnyObject, jsonSchema);

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

    clean(config: S) {
        try {
            return (this.constructor as typeof InMemoryEntity).validateData(config, true) as S;
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
    getAsEntityReference(byIdOnly: true): { _id: NonNullable<S["_id"]> };

    getAsEntityReference(byIdOnly?: false): EntityReferenceSchema & { _id: string; cls: string };

    getAsEntityReference(byIdOnly = false) {
        // Slug is usually present on entity references, but not required for all entities
        // (e.g. workflows are not slugified). Only `_id` is required to form a reference.
        if (!this._id) {
            throw new EntityError({
                code: ValidationErrorCode.ENTITY_REFERENCE_ERROR,
                details: {
                    json: this._json,
                    schema: (this.constructor as typeof InMemoryEntity).jsonSchema || {},
                },
            });
        }

        if (byIdOnly) {
            return { _id: this._id };
        }

        return {
            _id: this._id,
            ...(this.slug !== undefined ? { slug: this.slug } : {}),
            cls: this.getClsName(),
        };
    }

    // Properties from BaseInMemoryEntitySchema

    get id() {
        return this.prop("_id");
    }

    set id(id: S["_id"]) {
        this.setProp("_id", id);
    }

    get _id() {
        return this.prop("_id");
    }

    set _id(id: S["_id"]) {
        this.setProp("_id", id);
    }

    get schemaVersion() {
        return this.prop("schemaVersion");
    }

    set schemaVersion(schemaVersion: S["schemaVersion"]) {
        this.setProp("schemaVersion", schemaVersion);
    }

    get systemName() {
        return this.prop("systemName");
    }

    set systemName(systemName: S["systemName"]) {
        this.setProp("systemName", systemName);
    }

    get slug() {
        return this.prop("slug");
    }

    get isSystemEntity() {
        return Boolean(this.systemName);
    }
}

export type InMemoryEntityConstructor<T extends InMemoryEntity = InMemoryEntity> = new (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
) => T;
