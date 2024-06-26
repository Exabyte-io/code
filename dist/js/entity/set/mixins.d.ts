import { InMemoryEntityConstructor } from "../in_memory";
export declare function InMemoryEntityInSetMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        inSet: {
            _id?: string | undefined;
            cls?: string | undefined;
            slug?: string | undefined;
            type?: string | undefined;
            index?: number | undefined;
        }[];
        getInSetFilteredByCls(cls: string): {
            _id?: string | undefined;
            cls?: string | undefined;
            slug?: string | undefined;
            type?: string | undefined;
            index?: number | undefined;
        }[];
        readonly parentEntitySetReference: {
            _id?: string | undefined;
            cls?: string | undefined;
            slug?: string | undefined;
            type?: string | undefined;
            index?: number | undefined;
        } | undefined;
        _json: import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        prop<T_1 = undefined>(name: string, defaultValue: T_1): T_1;
        prop<T_2 = undefined>(name: string): T_2 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: import("@mat3ra/esse/dist/js/esse/types").AnyObject): any;
        toJSON(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        toJSONSafe(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        toJSONQuick(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        clone(extraContext?: object | undefined): any;
        validate(): void;
        clean(config: import("@mat3ra/esse/dist/js/esse/types").AnyObject): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/dist/js/types").EntityReferenceSchema;
        getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
    };
} & T;
export declare function InMemoryEntitySetMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        containsEntity<T_3 extends {
            inSet: {
                _id?: string | undefined;
                cls?: string | undefined;
                slug?: string | undefined;
                type?: string | undefined;
                index?: number | undefined;
            }[];
            getInSetFilteredByCls(cls: string): {
                _id?: string | undefined;
                cls?: string | undefined;
                slug?: string | undefined;
                type?: string | undefined;
                index?: number | undefined;
            }[];
            readonly parentEntitySetReference: {
                _id?: string | undefined;
                cls?: string | undefined;
                slug?: string | undefined;
                type?: string | undefined;
                index?: number | undefined;
            } | undefined;
            _json: import("@mat3ra/esse/dist/js/esse/types").AnyObject;
            prop<T_1 = undefined>(name: string, defaultValue: T_1): T_1;
            prop<T_2 = undefined>(name: string): T_2 | undefined;
            setProp(name: string, value: unknown): void;
            unsetProp(name: string): void;
            setProps(json?: import("@mat3ra/esse/dist/js/esse/types").AnyObject): any;
            toJSON(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
            toJSONSafe(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
            toJSONQuick(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
            clone(extraContext?: object | undefined): any;
            validate(): void;
            clean(config: import("@mat3ra/esse/dist/js/esse/types").AnyObject): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
            isValid(): boolean;
            id: string;
            readonly cls: string;
            getClsName(): string;
            readonly slug: string;
            readonly isSystemEntity: boolean;
            getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/dist/js/types").EntityReferenceSchema;
            getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
        } & import("../in_memory").InMemoryEntity>(entity?: T_3 | undefined): boolean | undefined;
        _json: import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        prop<T_1 = undefined>(name: string, defaultValue: T_1): T_1;
        prop<T_2 = undefined>(name: string): T_2 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: import("@mat3ra/esse/dist/js/esse/types").AnyObject): any;
        toJSON(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        toJSONSafe(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        toJSONQuick(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        clone(extraContext?: object | undefined): any;
        validate(): void;
        clean(config: import("@mat3ra/esse/dist/js/esse/types").AnyObject): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/dist/js/types").EntityReferenceSchema;
        getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
    };
} & T;
