import { InMemoryEntity } from "./in_memory";
declare const InMemoryEntitySet_base: {
    new (...args: any[]): {
        containsEntity<T_2 extends {
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
            _json: import("./in_memory").AnyObject;
            prop<T = undefined>(name: string, defaultValue: T): T;
            prop<T_1 = undefined>(name: string): T_1 | undefined;
            setProp(name: string, value: unknown): void;
            unsetProp(name: string): void;
            toJSON(exclude?: string[]): import("./in_memory").AnyObject;
            toJSONSafe(exclude?: string[]): import("./in_memory").AnyObject;
            toJSONQuick(exclude?: string[]): import("./in_memory").AnyObject;
            clone(extraContext?: object | undefined): any;
            validate(): void;
            clean(config: import("./in_memory").AnyObject): import("./in_memory").AnyObject;
            isValid(): boolean;
            id: string;
            readonly cls: string;
            getClsName(): string;
            readonly slug: string;
            readonly isSystemEntity: boolean;
            getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
            getEntityByName(entities: InMemoryEntity[], entity: string, name: string): InMemoryEntity;
        } & InMemoryEntity>(entity?: T_2 | undefined): boolean | undefined;
        _json: import("./in_memory").AnyObject;
        prop<T = undefined>(name: string, defaultValue: T): T;
        prop<T_1 = undefined>(name: string): T_1 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        toJSON(exclude?: string[]): import("./in_memory").AnyObject;
        toJSONSafe(exclude?: string[]): import("./in_memory").AnyObject;
        toJSONQuick(exclude?: string[]): import("./in_memory").AnyObject;
        clone(extraContext?: object | undefined): any;
        validate(): void;
        clean(config: import("./in_memory").AnyObject): import("./in_memory").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
        getEntityByName(entities: InMemoryEntity[], entity: string, name: string): InMemoryEntity;
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
        _json: import("./in_memory").AnyObject;
        prop<T = undefined>(name: string, defaultValue: T): T;
        prop<T_1 = undefined>(name: string): T_1 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        toJSON(exclude?: string[]): import("./in_memory").AnyObject;
        toJSONSafe(exclude?: string[]): import("./in_memory").AnyObject;
        toJSONQuick(exclude?: string[]): import("./in_memory").AnyObject;
        clone(extraContext?: object | undefined): any;
        validate(): void;
        clean(config: import("./in_memory").AnyObject): import("./in_memory").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
        getEntityByName(entities: InMemoryEntity[], entity: string, name: string): InMemoryEntity;
    };
} & typeof InMemoryEntity;
export declare class InMemoryEntitySet extends InMemoryEntitySet_base {
    get isEntitySet(): boolean | undefined;
    get entitySetType(): string | undefined;
    get entityCls(): string | undefined;
    get cls(): string;
    toJSONForInclusionInEntity(): {
        _id: string;
        type: string;
    };
}
export {};
