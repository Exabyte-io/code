import type { NameResultSchema, RuntimeItemSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
export declare enum ItemKey {
    results = "results",
    monitors = "monitors",
    preProcessors = "preProcessors",
    postProcessors = "postProcessors"
}
export type BaseRuntimeItemsInMemoryEntity = InMemoryEntity & {
    _json: {
        results?: NameResultSchema[];
        monitors?: NameResultSchema[];
        preProcessors?: NameResultSchema[];
        postProcessors?: NameResultSchema[];
    };
    defaultResults?: NameResultSchema[];
    defaultMonitors?: NameResultSchema[];
    defaultPreProcessors?: NameResultSchema[];
    defaultPostProcessors?: NameResultSchema[];
};
export declare function runtimeItemsMixin(item: BaseRuntimeItemsInMemoryEntity): {
    results: NameResultSchema[];
    monitors: NameResultSchema[];
    preProcessors: NameResultSchema[];
    postProcessors: NameResultSchema[];
    readonly resultNames: string[];
    readonly monitorNames: string[];
    readonly preProcessorNames: string[];
    readonly postProcessorNames: string[];
    _addRuntimeItem(key: ItemKey, config: RuntimeItemSchema): void;
    _removeRuntimeItem(key: ItemKey, config: RuntimeItemSchema): void;
    _removeRuntimeItemByName(key: ItemKey, name: string): void;
    _toggleRuntimeItem(key: ItemKey, data: RuntimeItemSchema, isAdding: boolean): void;
    toggleResult(data: RuntimeItemSchema, isAdding: boolean): void;
    toggleMonitor(data: RuntimeItemSchema, isAdding: boolean): void;
    togglePreProcessor(data: RuntimeItemSchema, isAdding: boolean): void;
    togglePostProcessor(data: RuntimeItemSchema, isAdding: boolean): void;
    getResultByName(name: string): NameResultSchema | undefined;
};
export type RuntimeItemsInMemoryEntity = ReturnType<typeof runtimeItemsMixin>;
export type RuntimeItemsInMemoryEntityConstructor = Constructor<RuntimeItemsInMemoryEntity>;
export default function RuntimeItemsMixin<S extends Constructor<BaseRuntimeItemsInMemoryEntity>>(superclass: S): S & RuntimeItemsInMemoryEntityConstructor;
