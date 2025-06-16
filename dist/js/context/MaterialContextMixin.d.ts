import type { MaterialSchema } from "@mat3ra/esse/dist/js/types";
import type { InMemoryEntity } from "../entity/in_memory";
import type { Constructor } from "../utils/types";
import type { ContextProvider } from "./provider";
type Material = InMemoryEntity & MaterialSchema & {
    hash: string;
};
export type MaterialContextMixinType = {
    isEditedIsSetToFalseOnMaterialUpdate?: boolean;
    updateMaterialHash: () => void;
    isMaterialCreatedDefault: boolean;
    isMaterialUpdated: boolean;
    material: Material;
    extraData?: {
        materialHash: string;
    };
};
export declare function materialContextMixin(item: ContextProvider & {
    _material: Material;
}): void;
export declare function MaterialContextMixin<T extends Constructor<ContextProvider & {
    _material: Material;
}>>(superclass: T): T & Constructor<MaterialContextMixinType>;
export {};
