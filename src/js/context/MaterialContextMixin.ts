import type { MaterialSchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";
import type { Constructor } from "../utils/types";
import type { ContextProvider } from "./provider";

type Material = InMemoryEntity &
    MaterialSchema & {
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

export function materialContextMixin(item: ContextProvider & { _material: Material }) {
    const properties = {
        updateMaterialHash() {
            if (this.isEditedIsSetToFalseOnMaterialUpdate) this.isEdited = false;
            this.extraData = { materialHash: this.material.hash };
        },

        // Workaround: Material.createDefault() used to initiate workflow reducer and hence here too
        //  does not have an id. Here we catch when such material is used and avoid resetting isEdited
        get isMaterialCreatedDefault() {
            return !this.material.id;
        },

        get isMaterialUpdated() {
            return Boolean(this.extraData && this.extraData.materialHash !== this.material.hash);
        },

        get material() {
            return this._material;
        },
    } as MaterialContextMixinType & typeof item;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export function MaterialContextMixin<
    T extends Constructor<ContextProvider & { _material: Material }>,
>(superclass: T) {
    materialContextMixin(superclass.prototype);
    return superclass as T & Constructor<MaterialContextMixinType>;
}
