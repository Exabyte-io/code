import { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { AbstractConstructor, Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
export type Validatable = {
    validate(): void;
    isValid(): boolean;
    clean<T extends object>(config: T): T;
};
export type ValidatableInMemoryStaticEntity = {
    validateData(data: object, clean?: boolean, jsonSchema?: JSONSchema): object;
    allowJsonSchemaTypesCoercing: boolean;
    readonly jsonSchema?: JSONSchema;
};
export type ValidatableInMemoryEntityConstructor = Constructor<Validatable> & ValidatableInMemoryStaticEntity;
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
export declare function validatableEntityMixin(Item: AbstractConstructor<InMemoryEntity>): void;
