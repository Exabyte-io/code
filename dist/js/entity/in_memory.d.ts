import { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import { BaseInMemoryEntitySchema, EntityReferenceSchema } from "@mat3ra/esse/dist/js/types";
export declare enum ValidationErrorCode {
    IN_MEMORY_ENTITY_DATA_INVALID = "IN_MEMORY_ENTITY_DATA_INVALID",
    ENTITY_REFERENCE_ERROR = "ENTITY_REFERENCE_ERROR",
    REQUIRED_PROPERTY_MISSING = "REQUIRED_PROPERTY_MISSING"
}
interface ErrorDetails {
    error?: object | null;
    json: object;
    schema: JSONSchema;
}
export declare class EntityError extends Error {
    code: string;
    details?: ErrorDetails;
    constructor({ code, details }: {
        code: ValidationErrorCode;
        details?: ErrorDetails;
    });
}
type Schema = BaseInMemoryEntitySchema;
export declare class InMemoryEntity<S extends Schema = Schema> implements Schema {
    static create<T extends InMemoryEntity<Schema>>(config: Schema): T;
    static _isDeepCloneRequired: boolean;
    static allowJsonSchemaTypesCoercing: boolean;
    static readonly jsonSchema?: JSONSchema;
    _json: S;
    constructor(config: NoInfer<S>);
    prop<K extends keyof S>(name: K, defaultValue: S[K]): S[K];
    prop<K extends keyof S>(name: K): S[K] | undefined;
    /**
     * @summary Return a required prop, throwing an error if it doesn't exist or is undefined/null
     */
    requiredProp<K extends keyof S>(name: K): S[K];
    /**
     * @summary Set a prop
     */
    setProp(name: keyof S, value: S[typeof name]): void;
    /**
     * @summary Remove a prop
     */
    unsetProp(name: keyof S): void;
    /**
     * Updates internal JSON. Works the same as Mongo's $set operator
     * @see https://www.mongodb.com/docs/manual/reference/operator/update/set/#-set
     */
    setProps(json?: Partial<S>): this;
    /**
     * @summary Array of fields to exclude from resulted JSON.
     * JSON.stringify calls `toJSON(key)` with the parent property name (a string).
     * Only an actual array is treated as an omit list — otherwise stringify would
     * strip fields whose names match the property key (e.g. systemTeams.owner).
     */
    toJSON(exclude?: (keyof S)[]): S;
    toJSONSafe(exclude?: (keyof S)[]): S;
    toJSONQuick(exclude?: (keyof S)[]): S;
    /**
     * @summary Clone this entity
     */
    clone(extraContext?: object): this;
    static validateData(data: object, clean?: boolean, jsonSchema?: import("json-schema").JSONSchema7 | undefined): object;
    /**
     * @summary Validate entity contents against schema
     */
    validate(): void;
    clean(config: S): S;
    isValid(): boolean;
    static get cls(): string;
    get cls(): string;
    getClsName(): string;
    /**
     * @summary get small identifying payload of object
     * @param byIdOnly if true, return only the id
     * @returns identifying data
     */
    getAsEntityReference(byIdOnly: true): {
        _id: NonNullable<S["_id"]>;
    };
    getAsEntityReference(byIdOnly?: false): EntityReferenceSchema & {
        _id: string;
        cls: string;
    };
    get id(): S["_id"];
    set id(id: S["_id"]);
    get _id(): S["_id"];
    set _id(id: S["_id"]);
    get schemaVersion(): S["schemaVersion"];
    set schemaVersion(schemaVersion: S["schemaVersion"]);
    get systemName(): S["systemName"];
    set systemName(systemName: S["systemName"]);
    get slug(): S["slug"] | undefined;
    get isSystemEntity(): boolean;
}
export type InMemoryEntityConstructor<T extends InMemoryEntity = InMemoryEntity> = new (...args: any[]) => T;
export {};
