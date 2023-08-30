import Ajv from "ajv";
import getValue from "lodash/get";
import omit from "lodash/omit";

import { EntityReferenceSchema } from "../types";
import { clone, deepClone } from "../utils/clone";
import { getSchemaByClassName } from "../utils/schemas";

// TODO: https://exabyte.atlassian.net/browse/SOF-5946
// const schemas = new ESSE().schemas;

export interface AnyObject {
    [key: string]: unknown;
}

export interface SimpleSchemaContext {
    validate: (config: object) => void;
    isValid: () => boolean;
    getErrorObject?: () => object;
    validationErrors?: () => object;
}

export interface SimpleSchema {
    validate: (config: AnyObject) => void;
    clean: (config: AnyObject) => AnyObject;
    newContext: () => SimpleSchemaContext;
}

export class InMemoryEntity {
    static create(config: object) {
        return new (this.prototype.constructor as typeof InMemoryEntity)(config);
    }

    // Override if deepClone of config is required
    static _isDeepCloneRequired = false;

    _json: AnyObject = {};

    _schema: SimpleSchema | null = null;

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
     * @param {String[]} exclude
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
     * @param extraContext {Object}
     * @returns {*}
     */
    clone(extraContext: object = {}): InMemoryEntity {
        const Entity = this.constructor as typeof InMemoryEntity;

        return new Entity({ ...this.toJSON(), ...extraContext });
    }

    // override upon inheritance
    get schema() {
        return this._schema || null;
    }

    set schema(schema: SimpleSchema | null) {
        this._schema = schema;
    }

    /**
     * @summary Validate entity contents against schema
     */
    validate() {
        if (this.schema) {
            this.schema.validate(this.toJSON());
        } else {
            // @ts-ignore
            const ajv = new Ajv({ allErrors: true });

            return ajv.validate(this.jsonSchema, this.toJSON());
        }
    }

    clean(config: AnyObject): AnyObject {
        if (this.isSystemEntity) {
            return config;
        }
        return this.schema ? this.schema.clean(config) : config;
    }

    isValid() {
        if (!this.schema) {
            return this.validate();
        }

        const ctx = this.schema.newContext();
        const json = this.toJSON();

        ctx.validate(json);

        if (!ctx.isValid()) {
            console.log(JSON.stringify(json));
            if (ctx.getErrorObject) {
                console.log(ctx.getErrorObject());
            }
            if (ctx.validationErrors) {
                console.log(ctx.validationErrors());
            }
        }

        return ctx.isValid();
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
     * @param byIdOnly {boolean} if true, return only the id
     * @returns {Object} identifying data
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
     * @param entities {Array} the entities
     * @param entity {string} the kind of entities
     * @param name {string} the name of the entity to choose
     * @returns {*}
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

    /**
     * Returns class JSON schema
     */
    static get jsonSchema() {
        try {
            return getSchemaByClassName(this.name);
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.stack);
            }
            throw e;
        }
    }

    get jsonSchema() {
        try {
            return getSchemaByClassName(this.constructor.name);
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.stack);
            }
            throw e;
        }
    }
}

export type InMemoryEntityConstructor<T extends InMemoryEntity = InMemoryEntity> = new (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
) => T;
