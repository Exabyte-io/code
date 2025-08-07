import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import { BaseInMemoryEntitySchema, EntityReferenceSchema } from "@mat3ra/esse/dist/js/types";
export declare enum ValidationErrorCode {
    IN_MEMORY_ENTITY_DATA_INVALID = "IN_MEMORY_ENTITY_DATA_INVALID",
    ENTITY_REFERENCE_ERROR = "ENTITY_REFERENCE_ERROR",
    REQUIRED_PROPERTY_MISSING = "REQUIRED_PROPERTY_MISSING"
}
interface ErrorDetails {
    error?: object | null;
    json: AnyObject;
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
export declare class InMemoryEntity implements BaseInMemoryEntitySchema {
    static create(config: object): InMemoryEntity;
    static _isDeepCloneRequired: boolean;
    static allowJsonSchemaTypesCoercing: boolean;
    static readonly jsonSchema?: JSONSchema;
    _json: AnyObject;
    constructor(config?: {});
    prop<T = undefined>(name: string, defaultValue: T): T;
    prop<T = undefined>(name: string): T | undefined;
    /**
     * @summary Return a required prop, throwing an error if it doesn't exist or is undefined/null
     */
    requiredProp<T>(name: string): T;
    /**
     * @summary Set a prop
     */
    setProp(name: string, value: unknown): void;
    /**
     * @summary Remove a prop
     */
    unsetProp(name: string): void;
    /**
     * Updates internal JSON. Works the same as Mongo's $set operator
     * @see https://www.mongodb.com/docs/manual/reference/operator/update/set/#-set
     */
    setProps(json?: AnyObject): this;
    /**
     * @summary Array of fields to exclude from resulted JSON
     */
    toJSON(exclude?: string[]): AnyObject;
    toJSONSafe(exclude?: string[]): AnyObject;
    toJSONQuick(exclude?: string[]): AnyObject;
    /**
     * @summary Clone this entity
     */
    clone(extraContext?: object): this;
    static validateData(data: AnyObject, clean?: boolean, jsonSchema?: import("json-schema").JSONSchema7 | undefined): AnyObject;
    /**
     * @summary Validate entity contents against schema
     */
    validate(): void;
    clean(config: AnyObject): AnyObject;
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
        _id: string;
    };
    getAsEntityReference(byIdOnly?: false): Required<EntityReferenceSchema>;
    /**
     * @summary Pluck an entity from a collection by name.
     *          If no name is provided and no entity has prop isDefault, return the first entity
     * @param entities the entities
     * @param entity the kind of entities
     * @param name the name of the entity to choose
     */
    getEntityByName(entities: InMemoryEntity[], entity: string, name: string): InMemoryEntity;
    get id(): string;
    set id(id: string);
    get _id(): string;
    set _id(id: string);
    get schemaVersion(): string;
    set schemaVersion(schemaVersion: string);
    get systemName(): string;
    set systemName(systemName: string);
    get slug(): string;
    get isSystemEntity(): boolean;
}
export type InMemoryEntityConstructor<T extends InMemoryEntity = InMemoryEntity> = new (...args: any[]) => T;
export {};
