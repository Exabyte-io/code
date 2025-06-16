import type { MaterialSchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";
import type { Constructor } from "../utils/types";
import type { ContextProvider } from "./provider";

type Material = InMemoryEntity &
    MaterialSchema & {
        hash: string;
    };

type MaterialsContextMixinType = {
    materials: Material[];
    initMaterialsContextMixin: () => void;
};

export function materialsContextMixin(item: ContextProvider & { _materials: Material[] }) {
    const properties = {
        get materials() {
            return this._materials;
        },
        initMaterialsContextMixin() {
            // @ts-ignore
            const materials = this.config.context?.materials;
            // @ts-ignore
            if (!this.constructor.Material) {
                throw Error("MaterialsContextMixin: Material is undefined");
            }
            this._materials =
                materials && materials.length
                    ? materials
                    : // @ts-ignore
                      [this.constructor.Material.createDefault()];
        },
    } as MaterialsContextMixinType & typeof item;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export function MaterialsContextMixin<
    T extends Constructor<ContextProvider & { _material: Material }>,
>(superclass: T) {
    materialsContextMixin(superclass.prototype);
    return superclass as T & Constructor<MaterialsContextMixinType>;
}
