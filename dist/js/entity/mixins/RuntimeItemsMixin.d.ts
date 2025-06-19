import type { NameResultSchema } from "@mat3ra/esse/dist/js/types";
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
export declare function runtimeItemsMixin(item: BaseRuntimeItemsInMemoryEntity): void;
export type RuntimeItemsInMemoryEntity = {
    results: NameResultSchema[];
    monitors: NameResultSchema[];
    preProcessors: NameResultSchema[];
    postProcessors: NameResultSchema[];
    hashObjectFromRuntimeItems: {
        results: NameResultSchema[];
        preProcessors: NameResultSchema[];
        postProcessors: NameResultSchema[];
    };
};
export type RuntimeItemsInMemoryEntityConstructor = Constructor<RuntimeItemsInMemoryEntity>;
export default function RuntimeItemsMixin<S extends Constructor<BaseRuntimeItemsInMemoryEntity>>(superclass: S): S & RuntimeItemsInMemoryEntityConstructor;
