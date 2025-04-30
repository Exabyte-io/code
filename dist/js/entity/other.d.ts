import { InMemoryEntity } from "./in_memory";
declare const DefaultableInMemoryEntity_base: typeof InMemoryEntity & import("../utils/types").Constructor<{
    isDefault: boolean;
}> & {
    createDefault<T extends import("../utils/types").Constructor<InMemoryEntity> & {
        defaultConfig?: object | null;
    }>(this: T): InstanceType<T> & {
        isDefault: boolean;
    };
};
export declare class DefaultableInMemoryEntity extends DefaultableInMemoryEntity_base {
}
export declare const NamedInMemoryEntity: typeof InMemoryEntity & import("./mixins/NamedEntityMixin").NamedInMemoryEntityConstructor;
export declare const NamedDefaultableInMemoryEntity: typeof InMemoryEntity & import("../utils/types").Constructor<{
    isDefault: boolean;
}> & {
    createDefault<T extends import("../utils/types").Constructor<InMemoryEntity> & {
        defaultConfig?: object | null;
    }>(this: T): InstanceType<T> & {
        isDefault: boolean;
    };
} & import("./mixins/NamedEntityMixin").NamedInMemoryEntityConstructor;
export declare const HasMetadataNamedDefaultableInMemoryEntity: typeof InMemoryEntity & import("../utils/types").Constructor<{
    isDefault: boolean;
}> & {
    createDefault<T extends import("../utils/types").Constructor<InMemoryEntity> & {
        defaultConfig?: object | null;
    }>(this: T): InstanceType<T> & {
        isDefault: boolean;
    };
} & import("./mixins/NamedEntityMixin").NamedInMemoryEntityConstructor & import("./mixins/HasMetadataMixin").HasMetadataInMemoryEntityConstructor;
export declare const HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity: typeof InMemoryEntity & import("../utils/types").Constructor<{
    isDefault: boolean;
}> & {
    createDefault<T extends import("../utils/types").Constructor<InMemoryEntity> & {
        defaultConfig?: object | null;
    }>(this: T): InstanceType<T> & {
        isDefault: boolean;
    };
} & import("./mixins/NamedEntityMixin").NamedInMemoryEntityConstructor & import("./mixins/HasMetadataMixin").HasMetadataInMemoryEntityConstructor & import("./mixins/HasConsistencyChecksMixin").HasConsistencyChecksInMemoryEntityConstructor;
export declare const NamedDefaultableRepetitionImportantSettingsInMemoryEntity: {
    new (...args: any[]): {
        readonly important: any;
        setImportant(key: string, value: unknown): void;
        readonly importantSettingsProviders: import("./mixins/context").ContextProvider[];
        isImportantEdited: boolean | undefined;
        _contextProviders: import("./mixins/context").ContextProvider[];
        readonly contextProviders: import("./mixins/context").ContextProvider[];
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
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
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
        _repetition: number;
        _totalRepetitions: number;
        units: import("./mixins/repetition").HasRepetition[];
        workflows: import("./mixins/repetition").HasRepetition[];
        subworkflows: import("./mixins/repetition").HasRepetition[];
        readonly repetition: number;
        setRepetition(repetition: number): void;
        readonly totalRepetitions: number;
        setTotalRepetitions(totalRepetition: number): void;
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
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
        getEntityByName(entities: InMemoryEntity[], entity: string, name: string): InMemoryEntity;
        id: string;
        _id: string;
        schemaVersion: string;
        systemName: string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
    };
} & typeof InMemoryEntity & import("../utils/types").Constructor<{
    isDefault: boolean;
}> & {
    createDefault<T extends import("../utils/types").Constructor<InMemoryEntity> & {
        defaultConfig?: object | null;
    }>(this: T): InstanceType<T> & {
        isDefault: boolean;
    };
} & import("./mixins/NamedEntityMixin").NamedInMemoryEntityConstructor;
export declare const NamedDefaultableRepetitionContextAndRenderInMemoryEntity: {
    new (...params: any[]): {
        _context: import("./mixins/context").Context;
        context: import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        updateContext(ctx?: {}, executeRender?: boolean): void;
        getPersistentContext(): object | undefined;
        updatePersistentContext(ctx?: object): void;
        getCombinedContext(): {
            [x: string]: unknown;
        };
        render(_context?: import("@mat3ra/esse/dist/js/esse/types").AnyObject): void;
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
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
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
        _repetition: number;
        _totalRepetitions: number;
        units: import("./mixins/repetition").HasRepetition[];
        workflows: import("./mixins/repetition").HasRepetition[];
        subworkflows: import("./mixins/repetition").HasRepetition[];
        readonly repetition: number;
        setRepetition(repetition: number): void;
        readonly totalRepetitions: number;
        setTotalRepetitions(totalRepetition: number): void;
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
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
        getEntityByName(entities: InMemoryEntity[], entity: string, name: string): InMemoryEntity;
        id: string;
        _id: string;
        schemaVersion: string;
        systemName: string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
    };
} & typeof InMemoryEntity & import("../utils/types").Constructor<{
    isDefault: boolean;
}> & {
    createDefault<T extends import("../utils/types").Constructor<InMemoryEntity> & {
        defaultConfig?: object | null;
    }>(this: T): InstanceType<T> & {
        isDefault: boolean;
    };
} & import("./mixins/NamedEntityMixin").NamedInMemoryEntityConstructor;
export declare const NamedDefaultableRepetitionRuntimeItemsImportantSettingsContextAndRenderHashedInMemoryEntity: {
    new (...args: any[]): {
        getHashObject(): {};
        calculateHash(): string;
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
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
        getEntityByName(entities: InMemoryEntity[], entity: string, name: string): InMemoryEntity;
        id: string;
        _id: string;
        schemaVersion: string;
        systemName: string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
    };
} & {
    new (...params: any[]): {
        _context: import("./mixins/context").Context;
        context: import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        updateContext(ctx?: {}, executeRender?: boolean): void;
        getPersistentContext(): object | undefined;
        updatePersistentContext(ctx?: object): void;
        getCombinedContext(): {
            [x: string]: unknown;
        };
        render(_context?: import("@mat3ra/esse/dist/js/esse/types").AnyObject): void;
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
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
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
        readonly important: any;
        setImportant(key: string, value: unknown): void;
        readonly importantSettingsProviders: import("./mixins/context").ContextProvider[];
        isImportantEdited: boolean | undefined;
        _contextProviders: import("./mixins/context").ContextProvider[];
        readonly contextProviders: import("./mixins/context").ContextProvider[];
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
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
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
        readonly allowedResults: never[];
        readonly allowedMonitors: never[];
        readonly allowedPostProcessors: never[];
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
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
        getEntityByName(entities: InMemoryEntity[], entity: string, name: string): InMemoryEntity;
        id: string;
        _id: string;
        schemaVersion: string;
        systemName: string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
    };
} & {
    new (...params: any): {
        _json: import("./mixins/runtime_items").RuntimeItemsUILogicJSON;
        getDefaultsByKey(key: import("./mixins/runtime_items").ItemKey): import("@mat3ra/esse/dist/js/types").NameResultSchema[];
        setRuntimeItemsToDefaultValues(): void;
        _initRuntimeItems(keys: import("./mixins/runtime_items").ItemKey[], _config: object): void;
        _addRuntimeItem(key: import("./mixins/runtime_items").ItemKey | undefined, config: import("@mat3ra/esse/dist/js/types").RuntimeItemSchema): void;
        _removeRuntimeItem(key: import("./mixins/runtime_items").ItemKey | undefined, config: import("@mat3ra/esse/dist/js/types").RuntimeItemSchema): void;
        _removeRuntimeItemByName(key: import("./mixins/runtime_items").ItemKey, name: string): void;
        _toggleRuntimeItem(key: import("./mixins/runtime_items").ItemKey | undefined, data: import("@mat3ra/esse/dist/js/types").RuntimeItemSchema, isAdding: boolean): void;
        toggleResult(data: import("@mat3ra/esse/dist/js/types").RuntimeItemSchema, isAdding: boolean): void;
        toggleMonitor(data: import("@mat3ra/esse/dist/js/types").RuntimeItemSchema, isAdding: boolean): void;
        togglePreProcessor(data: import("@mat3ra/esse/dist/js/types").RuntimeItemSchema, isAdding: boolean): void;
        togglePostProcessor(data: import("@mat3ra/esse/dist/js/types").RuntimeItemSchema, isAdding: boolean): void;
        readonly resultNames: string[];
        readonly monitorNames: string[];
        readonly postProcessorNames: string[];
        readonly preProcessorNames: string[];
        getResultByName(name: string): import("@mat3ra/esse/dist/js/types").NameResultSchema | undefined;
        readonly results: import("@mat3ra/esse/dist/js/types").NameResultSchema[];
        readonly monitors: import("@mat3ra/esse/dist/js/types").NameResultSchema[];
        readonly preProcessors: import("@mat3ra/esse/dist/js/types").NameResultSchema[];
        readonly postProcessors: import("@mat3ra/esse/dist/js/types").NameResultSchema[];
        readonly defaultResults: import("@mat3ra/esse/dist/js/types").NameResultSchema[];
        readonly defaultMonitors: import("@mat3ra/esse/dist/js/types").NameResultSchema[];
        readonly defaultPreProcessors: import("@mat3ra/esse/dist/js/types").NameResultSchema[];
        readonly defaultPostProcessors: import("@mat3ra/esse/dist/js/types").NameResultSchema[];
        readonly hashObjectFromRuntimeItems: {
            results: import("@mat3ra/esse/dist/js/types").NameResultSchema[];
            preProcessors: import("@mat3ra/esse/dist/js/types").NameResultSchema[];
            postProcessors: import("@mat3ra/esse/dist/js/types").NameResultSchema[];
        };
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
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
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
        _repetition: number;
        _totalRepetitions: number;
        units: import("./mixins/repetition").HasRepetition[];
        workflows: import("./mixins/repetition").HasRepetition[];
        subworkflows: import("./mixins/repetition").HasRepetition[];
        readonly repetition: number;
        setRepetition(repetition: number): void;
        readonly totalRepetitions: number;
        setTotalRepetitions(totalRepetition: number): void;
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
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
        getEntityByName(entities: InMemoryEntity[], entity: string, name: string): InMemoryEntity;
        id: string;
        _id: string;
        schemaVersion: string;
        systemName: string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
    };
} & typeof InMemoryEntity & import("../utils/types").Constructor<{
    isDefault: boolean;
}> & {
    createDefault<T extends import("../utils/types").Constructor<InMemoryEntity> & {
        defaultConfig?: object | null;
    }>(this: T): InstanceType<T> & {
        isDefault: boolean;
    };
} & import("./mixins/NamedEntityMixin").NamedInMemoryEntityConstructor;
export {};
