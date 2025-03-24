import { InMemoryEntity } from "./in_memory";
declare const InMemoryEntitySet_base: {
    new (...args: any[]): {
        containsEntity<T extends import("@mat3ra/esse/dist/js/types").SystemInSetSchema>(entity?: T | undefined): boolean;
        _json: import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        prop<T = undefined>(name: string, defaultValue: T): T;
        prop<T = undefined>(name: string): T | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: import("@mat3ra/esse/dist/js/esse/types").AnyObject): /*elided*/ any;
        toJSON(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        toJSONSafe(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        toJSONQuick(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        clone(extraContext?: object): /*elided*/ any;
        validate(): void;
        clean(config: import("@mat3ra/esse/dist/js/esse/types").AnyObject): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        isValid(): boolean;
        readonly cls: string;
        getClsName(): string;
        getAsEntityReference(byIdOnly: true): {
            _id: string;
        };
        getAsEntityReference(byIdOnly: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
        getEntityByName(entities: InMemoryEntity[], entity: string, name: string): InMemoryEntity;
        id: string;
        _id: string;
        schemaVersion: string;
        systemName: string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
    };
} & {
    new (...args: any[]): {
        inSet: import("./set/mixins").InSet[];
        getInSetFilteredByCls(cls: string): {
            _id: string;
            cls?: string;
            slug?: string;
            type?: string;
            index?: number;
        }[];
        readonly parentEntitySetReference: {
            _id: string;
            cls?: string;
            slug?: string;
            type?: string;
            index?: number;
        } | undefined;
        _json: import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        prop<T = undefined>(name: string, defaultValue: T): T;
        prop<T = undefined>(name: string): T | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: import("@mat3ra/esse/dist/js/esse/types").AnyObject): /*elided*/ any;
        toJSON(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        toJSONSafe(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        toJSONQuick(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        clone(extraContext?: object): /*elided*/ any;
        validate(): void;
        clean(config: import("@mat3ra/esse/dist/js/esse/types").AnyObject): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        isValid(): boolean;
        readonly cls: string;
        getClsName(): string;
        getAsEntityReference(byIdOnly: true): {
            _id: string;
        };
        getAsEntityReference(byIdOnly: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
        getEntityByName(entities: InMemoryEntity[], entity: string, name: string): InMemoryEntity;
        id: string;
        _id: string;
        schemaVersion: string;
        systemName: string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
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
