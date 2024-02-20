import { InMemoryEntityConstructor } from "../in_memory";
export declare function InMemoryEntityInSetMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        inSet: {
            _id?: string;
            cls?: string;
            slug?: string;
            type?: string;
            index?: number;
        }[];
        getInSetFilteredByCls(cls: string): {
            _id?: string;
            cls?: string;
            slug?: string;
            type?: string;
            index?: number;
        }[];
        readonly parentEntitySetReference: {
            _id?: string;
            cls?: string;
            slug?: string;
            type?: string;
            index?: number;
        };
        _json: import("../in_memory").AnyObject;
        prop<T_1 = null>(name: string, defaultValue?: T_1): T_1;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        toJSON(exclude?: string[]): import("../in_memory").AnyObject;
        toJSONSafe(exclude?: string[]): import("../in_memory").AnyObject;
        toJSONQuick(exclude?: string[]): import("../in_memory").AnyObject;
        clone(extraContext?: object): any;
        validate(): void;
        clean(config: import("../in_memory").AnyObject): import("../in_memory").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
        getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): any;
    };
} & T;
export declare function InMemoryEntitySetMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        containsEntity<T_2 extends {
            inSet: {
                _id?: string;
                cls?: string;
                slug?: string;
                type?: string;
                index?: number;
            }[];
            getInSetFilteredByCls(cls: string): {
                _id?: string;
                cls?: string;
                slug?: string;
                type?: string;
                index?: number;
            }[];
            readonly parentEntitySetReference: {
                _id?: string;
                cls?: string;
                slug?: string;
                type?: string;
                index?: number;
            };
            _json: import("../in_memory").AnyObject;
            prop<T_1 = null>(name: string, defaultValue?: T_1): T_1;
            setProp(name: string, value: unknown): void;
            unsetProp(name: string): void;
            toJSON(exclude?: string[]): import("../in_memory").AnyObject;
            toJSONSafe(exclude?: string[]): import("../in_memory").AnyObject;
            toJSONQuick(exclude?: string[]): import("../in_memory").AnyObject;
            clone(extraContext?: object): any;
            validate(): void;
            clean(config: import("../in_memory").AnyObject): import("../in_memory").AnyObject;
            isValid(): boolean;
            id: string;
            readonly cls: string;
            getClsName(): string;
            readonly slug: string;
            readonly isSystemEntity: boolean;
            getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
            getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): any;
        } & import("../in_memory").InMemoryEntity>(entity?: T_2): boolean;
        _json: import("../in_memory").AnyObject;
        prop<T_1 = null>(name: string, defaultValue?: T_1): T_1;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        toJSON(exclude?: string[]): import("../in_memory").AnyObject;
        toJSONSafe(exclude?: string[]): import("../in_memory").AnyObject;
        toJSONQuick(exclude?: string[]): import("../in_memory").AnyObject;
        clone(extraContext?: object): any;
        validate(): void;
        clean(config: import("../in_memory").AnyObject): import("../in_memory").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
        getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): any;
    };
} & T;
