import { InMemoryEntity } from "./in_memory";
declare const InMemoryEntitySet_base: {
    new (...args: any[]): {
        containsEntity<T_1 extends {
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
            _json: import("./in_memory").AnyObject;
            prop<T = null>(name: string, defaultValue?: T): T;
            setProp(name: string, value: unknown): void;
            unsetProp(name: string): void;
            toJSON(exclude?: string[]): import("./in_memory").AnyObject;
            toJSONSafe(exclude?: string[]): import("./in_memory").AnyObject;
            toJSONQuick(exclude?: string[]): import("./in_memory").AnyObject;
            clone(extraContext?: object): any;
            validate(): void;
            clean(config: import("./in_memory").AnyObject): import("./in_memory").AnyObject;
            isValid(): boolean;
            id: string;
            readonly cls: string;
            getClsName(): string;
            readonly slug: string;
            readonly isSystemEntity: boolean;
            getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
            getEntityByName(entities: InMemoryEntity[], entity: string, name: string): any;
        } & InMemoryEntity>(entity?: T_1): boolean;
        _json: import("./in_memory").AnyObject;
        prop<T = null>(name: string, defaultValue?: T): T;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        toJSON(exclude?: string[]): import("./in_memory").AnyObject;
        toJSONSafe(exclude?: string[]): import("./in_memory").AnyObject;
        toJSONQuick(exclude?: string[]): import("./in_memory").AnyObject;
        clone(extraContext?: object): any;
        validate(): void;
        clean(config: import("./in_memory").AnyObject): import("./in_memory").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
        getEntityByName(entities: InMemoryEntity[], entity: string, name: string): any;
    };
} & {
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
        _json: import("./in_memory").AnyObject;
        prop<T = null>(name: string, defaultValue?: T): T;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        toJSON(exclude?: string[]): import("./in_memory").AnyObject;
        toJSONSafe(exclude?: string[]): import("./in_memory").AnyObject;
        toJSONQuick(exclude?: string[]): import("./in_memory").AnyObject;
        clone(extraContext?: object): any;
        validate(): void;
        clean(config: import("./in_memory").AnyObject): import("./in_memory").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
        getEntityByName(entities: InMemoryEntity[], entity: string, name: string): any;
    };
} & typeof InMemoryEntity;
export declare class InMemoryEntitySet extends InMemoryEntitySet_base {
    get isEntitySet(): boolean;
    get entitySetType(): string;
    get entityCls(): string;
    get cls(): string;
    toJSONForInclusionInEntity(): {
        _id: string;
        type: string;
    };
}
export {};
