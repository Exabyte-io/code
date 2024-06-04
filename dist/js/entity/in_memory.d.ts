import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import { EntityReferenceSchema } from "@mat3ra/esse/dist/js/types";
export declare enum ValidationErrorCode {
    IN_MEMORY_ENTITY_DATA_INVALID = "IN_MEMORY_ENTITY_DATA_INVALID"
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
export declare class InMemoryEntity {
    static create(config: object): InMemoryEntity;
    static _isDeepCloneRequired: boolean;
    static allowJsonSchemaTypesCoercing: boolean;
    static readonly jsonSchema?: JSONSchema;
    _json: AnyObject;
    constructor(config?: {});
    prop<T = undefined>(name: string, defaultValue: T): T;
    prop<T = undefined>(name: string): T | undefined;
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
    static validateData(data: AnyObject, clean?: boolean): AnyObject;
    /**
     * @summary Validate entity contents against schema
     */
    validate(): void;
    clean(config: AnyObject): AnyObject;
    isValid(): boolean;
    get id(): string;
    set id(id: string);
    static get cls(): string;
    get cls(): string;
    getClsName(): string;
    get slug(): string;
    get isSystemEntity(): boolean;
    /**
     * @summary get small identifying payload of object
     * @param byIdOnly if true, return only the id
     * @returns identifying data
     */
    getAsEntityReference(byIdOnly?: boolean): EntityReferenceSchema;
    /**
     * @summary Pluck an entity from a collection by name.
     *          If no name is provided and no entity has prop isDefault, return the first entity
     * @param entities the entities
     * @param entity the kind of entities
     * @param name the name of the entity to choose
     */
    getEntityByName(entities: InMemoryEntity[], entity: string, name: string): InMemoryEntity;
}
export type InMemoryEntityConstructor<T extends InMemoryEntity = InMemoryEntity> = new (...args: any[]) => T;
export {};
