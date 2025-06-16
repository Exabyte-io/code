"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialContextMixin = materialContextMixin;
exports.MaterialContextMixin = MaterialContextMixin;
function materialContextMixin(item) {
    const properties = {
        updateMaterialHash() {
            if (this.isEditedIsSetToFalseOnMaterialUpdate)
                this.isEdited = false;
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
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
function MaterialContextMixin(superclass) {
    materialContextMixin(superclass.prototype);
    return superclass;
}
