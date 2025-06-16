"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialsContextMixin = materialsContextMixin;
exports.MaterialsContextMixin = MaterialsContextMixin;
function materialsContextMixin(item) {
    const properties = {
        get materials() {
            return this._materials;
        },
        initMaterialsContextMixin() {
            var _a;
            // @ts-ignore
            const materials = (_a = this.config.context) === null || _a === void 0 ? void 0 : _a.materials;
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
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
function MaterialsContextMixin(superclass) {
    materialsContextMixin(superclass.prototype);
    return superclass;
}
