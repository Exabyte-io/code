import type { MaterialSchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
import type { Constructor } from "../utils/types";
import type { ContextProvider } from "./provider";
type Material = InMemoryEntity & MaterialSchema & {
    hash: string;
};
type MaterialsContextMixinType = {
    materials: Material[];
    initMaterialsContextMixin: () => void;
};
export declare function materialsContextMixin(item: ContextProvider & {
    _materials: Material[];
}): void;
export declare function MaterialsContextMixin<T extends Constructor<ContextProvider & {
    _material: Material;
}>>(superclass: T): T & Constructor<MaterialsContextMixinType>;
export {};
