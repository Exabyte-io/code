import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { NameResultSchema, RuntimeItemSchema } from "@mat3ra/esse/dist/js/types";
import { InMemoryEntityConstructor } from "../in_memory";
export declare enum ItemKey {
    results = "results",
    monitors = "monitors",
    preProcessors = "preProcessors",
    postProcessors = "postProcessors"
}
export declare function RuntimeItemsMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        readonly results: NameResultSchema[];
        readonly monitors: NameResultSchema[];
        readonly preProcessors: NameResultSchema[];
        readonly postProcessors: NameResultSchema[];
        readonly defaultResults: NameResultSchema[];
        readonly defaultMonitors: NameResultSchema[];
        readonly defaultPreProcessors: NameResultSchema[];
        readonly defaultPostProcessors: NameResultSchema[];
        readonly hashObjectFromRuntimeItems: {
            results: NameResultSchema[];
            preProcessors: NameResultSchema[];
            postProcessors: NameResultSchema[];
        };
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
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
        getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
        id: string;
        _id: string;
        schemaVersion: string;
        systemName: string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
    };
} & T;
export interface RuntimeItemsUILogicJSON extends AnyObject {
    results?: NameResultSchema[];
    monitors?: NameResultSchema[];
    preProcessors?: NameResultSchema[];
    postProcessors?: NameResultSchema[];
}
export declare function RuntimeItemsUILogicMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...params: any): {
        _json: RuntimeItemsUILogicJSON;
        getDefaultsByKey(key: ItemKey): NameResultSchema[];
        setRuntimeItemsToDefaultValues(): void;
        /**
         * @summary Must pass config for subclasses to override and use initialization logic
         * @private
         */
        _initRuntimeItems(keys: ItemKey[], _config: object): void;
        _addRuntimeItem(key: ItemKey | undefined, config: RuntimeItemSchema): void;
        _removeRuntimeItem(key: ItemKey | undefined, config: RuntimeItemSchema): void;
        _removeRuntimeItemByName(key: ItemKey, name: string): void;
        _toggleRuntimeItem(key: ItemKey | undefined, data: RuntimeItemSchema, isAdding: boolean): void;
        toggleResult(data: RuntimeItemSchema, isAdding: boolean): void;
        toggleMonitor(data: RuntimeItemSchema, isAdding: boolean): void;
        togglePreProcessor(data: RuntimeItemSchema, isAdding: boolean): void;
        togglePostProcessor(data: RuntimeItemSchema, isAdding: boolean): void;
        readonly resultNames: string[];
        readonly monitorNames: string[];
        readonly postProcessorNames: string[];
        readonly preProcessorNames: string[];
        getResultByName(name: string): NameResultSchema | undefined;
        readonly results: NameResultSchema[];
        readonly monitors: NameResultSchema[];
        readonly preProcessors: NameResultSchema[];
        readonly postProcessors: NameResultSchema[];
        readonly defaultResults: NameResultSchema[];
        readonly defaultMonitors: NameResultSchema[];
        readonly defaultPreProcessors: NameResultSchema[];
        readonly defaultPostProcessors: NameResultSchema[];
        readonly hashObjectFromRuntimeItems: {
            results: NameResultSchema[];
            preProcessors: NameResultSchema[];
            postProcessors: NameResultSchema[];
        };
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
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
        getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
        id: string;
        _id: string;
        schemaVersion: string;
        systemName: string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
    };
} & T;
export declare function RuntimeItemsUIAllowedMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        readonly allowedResults: never[];
        readonly allowedMonitors: never[];
        readonly allowedPostProcessors: never[];
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
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
        getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
        id: string;
        _id: string;
        schemaVersion: string;
        systemName: string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
    };
} & T;
