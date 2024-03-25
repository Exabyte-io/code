import { EntitySetSchema, SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import { InMemoryEntityConstructor } from "../../in_memory";
export declare function OrderedInMemoryEntitySetMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        entitySetType: EntitySetSchema["entitySetType"];
        readonly isOrderedSet: boolean;
        _json: import("../../in_memory").AnyObject;
        prop<T_1 = undefined>(name: string, defaultValue: T_1): T_1;
        prop<T_2 = undefined>(name: string): T_2 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: import("../../in_memory").AnyObject): any;
        toJSON(exclude?: string[]): import("../../in_memory").AnyObject;
        toJSONSafe(exclude?: string[]): import("../../in_memory").AnyObject;
        toJSONQuick(exclude?: string[]): import("../../in_memory").AnyObject;
        clone(extraContext?: object | undefined): any;
        validate(): void;
        clean(config: import("../../in_memory").AnyObject): import("../../in_memory").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/dist/js/types").EntityReferenceSchema;
        getEntityByName(entities: import("../../in_memory").InMemoryEntity[], entity: string, name: string): import("../../in_memory").InMemoryEntity;
    };
} & T;
export interface OrderedInMemoryEntityInSet {
    inSet: SystemInSetSchema["inSet"];
    getIndexByIdInOrderedSet(setId: string): number;
}
export declare function OrderedInMemoryEntityInSetMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        inSet: Required<SystemInSetSchema>["inSet"];
        getIndexByIdInOrderedSet(setId: string): number;
        _json: import("../../in_memory").AnyObject;
        prop<T_1 = undefined>(name: string, defaultValue: T_1): T_1;
        prop<T_2 = undefined>(name: string): T_2 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: import("../../in_memory").AnyObject): any;
        toJSON(exclude?: string[]): import("../../in_memory").AnyObject;
        toJSONSafe(exclude?: string[]): import("../../in_memory").AnyObject;
        toJSONQuick(exclude?: string[]): import("../../in_memory").AnyObject;
        clone(extraContext?: object | undefined): any;
        validate(): void;
        clean(config: import("../../in_memory").AnyObject): import("../../in_memory").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/dist/js/types").EntityReferenceSchema;
        getEntityByName(entities: import("../../in_memory").InMemoryEntity[], entity: string, name: string): import("../../in_memory").InMemoryEntity;
    };
} & T;
