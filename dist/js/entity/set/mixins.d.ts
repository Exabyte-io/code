import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import { InMemoryEntityConstructor } from "../in_memory";
export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];
export declare function InMemoryEntityInSetMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        inSet: InSet[];
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
        prop<T_1 = undefined>(name: string, defaultValue: T_1): T_1;
        prop<T_1 = undefined>(name: string): T_1 | undefined;
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
        getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
        id: string;
        _id: string;
        schemaVersion: string;
        systemName: string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
    };
} & T;
export declare function InMemoryEntitySetMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        containsEntity<T_1 extends SystemInSetSchema>(entity?: T_1 | undefined): boolean;
        _json: import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        prop<T_1 = undefined>(name: string, defaultValue: T_1): T_1;
        prop<T_1 = undefined>(name: string): T_1 | undefined;
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
        getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
        id: string;
        _id: string;
        schemaVersion: string;
        systemName: string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
    };
} & T;
