import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { InMemoryEntityConstructor } from "../in_memory";
export type Context = AnyObject;
export declare function ContextAndRenderFieldsMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...params: any[]): {
        _context: Context;
        context: AnyObject;
        updateContext(ctx?: {}, executeRender?: boolean): void;
        getPersistentContext(): object | undefined;
        updatePersistentContext(ctx?: object): void;
        getCombinedContext(): {
            [x: string]: unknown;
        };
        render(_context?: AnyObject): void;
        _json: AnyObject;
        prop<T_1 = undefined>(name: string, defaultValue: T_1): T_1;
        prop<T_1 = undefined>(name: string): T_1 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: AnyObject): /*elided*/ any;
        toJSON(exclude?: string[]): AnyObject;
        toJSONSafe(exclude?: string[]): AnyObject;
        toJSONQuick(exclude?: string[]): AnyObject;
        clone(extraContext?: object): /*elided*/ any;
        validate(): void;
        clean(config: AnyObject): AnyObject;
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
export interface ContextProvider {
    domain: string;
}
export declare function DomainContextProviderMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        _contextProviders: ContextProvider[];
        readonly contextProviders: ContextProvider[];
        _json: AnyObject;
        prop<T_1 = undefined>(name: string, defaultValue: T_1): T_1;
        prop<T_1 = undefined>(name: string): T_1 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: AnyObject): /*elided*/ any;
        toJSON(exclude?: string[]): AnyObject;
        toJSONSafe(exclude?: string[]): AnyObject;
        toJSONQuick(exclude?: string[]): AnyObject;
        clone(extraContext?: object): /*elided*/ any;
        validate(): void;
        clean(config: AnyObject): AnyObject;
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
export declare function ImportantSettingsProviderMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        readonly important: any;
        setImportant(key: string, value: unknown): void;
        readonly importantSettingsProviders: ContextProvider[];
        isImportantEdited: boolean | undefined;
        _contextProviders: ContextProvider[];
        readonly contextProviders: ContextProvider[];
        _json: AnyObject;
        prop<T_1 = undefined>(name: string, defaultValue: T_1): T_1;
        prop<T_1 = undefined>(name: string): T_1 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: AnyObject): /*elided*/ any;
        toJSON(exclude?: string[]): AnyObject;
        toJSONSafe(exclude?: string[]): AnyObject;
        toJSONQuick(exclude?: string[]): AnyObject;
        clone(extraContext?: object): /*elided*/ any;
        validate(): void;
        clean(config: AnyObject): AnyObject;
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
