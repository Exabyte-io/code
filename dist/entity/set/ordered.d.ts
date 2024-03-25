import { InMemoryEntitySet } from "../set";
export declare const OrderedInMemoryEntitySet: {
    new (...args: any[]): {
        entitySetType: string | undefined;
        readonly isOrderedSet: boolean;
        _json: import("src/js/entity/in_memory").AnyObject;
        prop<T = undefined>(name: string, defaultValue: T): T;
        prop<T_1 = undefined>(name: string): T_1 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: import("src/js/entity/in_memory").AnyObject): any;
        toJSON(exclude?: string[]): import("src/js/entity/in_memory").AnyObject;
        toJSONSafe(exclude?: string[]): import("src/js/entity/in_memory").AnyObject;
        toJSONQuick(exclude?: string[]): import("src/js/entity/in_memory").AnyObject;
        clone(extraContext?: object | undefined): any;
        validate(): void;
        clean(config: import("src/js/entity/in_memory").AnyObject): import("src/js/entity/in_memory").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
        getEntityByName(entities: import("src/js/entity").InMemoryEntity[], entity: string, name: string): import("src/js/entity").InMemoryEntity;
    };
} & {
    new (...args: any[]): {
        inSet: {
            _id?: string | undefined;
            cls?: string | undefined;
            slug?: string | undefined;
            type?: string | undefined;
            index?: number | undefined;
        }[];
        getIndexByIdInOrderedSet(setId: string): number;
        _json: import("src/js/entity/in_memory").AnyObject;
        prop<T = undefined>(name: string, defaultValue: T): T;
        prop<T_1 = undefined>(name: string): T_1 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: import("src/js/entity/in_memory").AnyObject): any;
        toJSON(exclude?: string[]): import("src/js/entity/in_memory").AnyObject;
        toJSONSafe(exclude?: string[]): import("src/js/entity/in_memory").AnyObject;
        toJSONQuick(exclude?: string[]): import("src/js/entity/in_memory").AnyObject;
        clone(extraContext?: object | undefined): any;
        validate(): void;
        clean(config: import("src/js/entity/in_memory").AnyObject): import("src/js/entity/in_memory").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
        getEntityByName(entities: import("src/js/entity").InMemoryEntity[], entity: string, name: string): import("src/js/entity").InMemoryEntity;
    };
} & typeof InMemoryEntitySet;
