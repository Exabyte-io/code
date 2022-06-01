import CryptoJS from "crypto-js";

import { compareEntitiesInOrderedSetForSorting } from "../entity/set/ordered/utils";

export const ApplicationContextMixinBuilder = (applicationCls) => (superclass) => class extends superclass {
    constructor(config) {
        super(config);
        if (!applicationCls) throw Error("ApplicationContextMixinBuilder: applicationCls is undefined");
        this._application = config.context && config.context.application || applicationCls.createDefault();
    }

    get application() {
        return this._application;
    }
};

export const MaterialContextMixinBuilder = (materialCls) => (superclass) => class extends superclass {

    constructor(config) {
        super(config);
        if (!materialCls) throw Error("MaterialContextMixinBuilder: materialCls is undefined");
        this._material = config.context && config.context.material;
        if (!this._material) this._material = materialCls.createDefault();
        this.updateMaterialHash();
    }

    get isEditedIsSetToFalseOnMaterialUpdate() {
        return false;
    }

    updateMaterialHash() {
        if (this.isEditedIsSetToFalseOnMaterialUpdate) this.isEdited = false;
        this.extraData = {materialHash: this.material.hash};
    }

    // Workaround: Material.createDefault() used to initiate workflow reducer and hence here too
    //  does not have an id. Here we catch when such material is used and avoid resetting isEdited
    get isMaterialCreatedDefault() {
        return !Boolean(this.material.id);
    }

    get isMaterialUpdated() {
        return Boolean(this.extraData && (this.extraData.materialHash !== this.material.hash));
    }

    get material() {
        return this._material;
    }
};

export const MaterialsSetContextMixin = (superclass) => class extends superclass {

    constructor(config) {
        super(config);
        this._materialsSet = this.config.context && this.config.context.materialsSet;
    }

    get materialsSet() {return this._materialsSet}

    sortMaterialsByIndexInSet(materials = []) {
        // DO NOT SORT IN PLACE AS IT CHANGES THE ORDER IN `this.materials` AND HAS SIDE EFFECTS (MaterialViewer).
        return materials.concat().sort((a, b) => compareEntitiesInOrderedSetForSorting(a, b, this.materialsSet._id, false));
    }

};

export const MaterialsContextMixinBuilder = (materialCls) => (superclass) => class extends superclass {

    constructor(config) {
        super(config);
        const materials = this.config.context && this.config.context.materials;
        if (!materialCls) throw Error("MaterialsContextMixinBuilder: materialCls is undefined");
        this._materials = (materials && materials.length) ? materials : [materialCls.createDefault()];
    }

    get materials() {return this._materials}
};

export const MethodDataContextMixin = (superclass) => class extends superclass {

    constructor(config) {
        super(config);
        this._methodData = config.context && config.context.methodData || {};
        this.isEdited = false;  // we always get the `defaultData` (recalculated from scratch, not persistent)
    }

    /* @summary Replace the logic in constructor with this in order to enable passing `methodDataHash` between
     *          subsequent initializations of the derived class. Not used at present and kept for the record.
     */
    _initMethodDataHash() {
        this.methodDataHash = CryptoJS.MD5(JSON.stringify(this.methodData)).toString();
        this.extraData = {methodDataHash: this.methodDataHash};
        if (!this._methodData) {
            this._methodData = {};
            this.isEdited = false;
            // Commented out to reduce effect on performance. Uncomment for debugging purposes.
            // TODO: remove on next refactoring or convert to log
            // console.warn("MethodDataContextMixin: methodData is undefined or null");
        } else {
            if (this.isMethodDataUpdated) {
                this.isEdited = false;
            } else {
                this.isEdited = config.isEdited;
            }
        }
    }

    get methodData() {return this._methodData}

    get isMethodDataUpdated() {
        return Boolean(this.extraData && (this.extraData.methodDataHash !== this.methodDataHash));
    }

};

export const WorkflowContextMixin = (superclass) => class extends superclass {

    constructor(config) {
        super(config);
        this._workflow = config.context && config.context.workflow || {};
        this.isEdited = false;  // we always get the `defaultData` (recalculated from scratch, not persistent)
    }

    get workflow() {return this._workflow}

};

export const JobContextMixin = (superclass) => class extends superclass {

    constructor(config) {
        super(config);
        this._job = config.context && config.context.job || {};
        this.isEdited = false;  // we always get the `defaultData` (recalculated from scratch, not persistent)
    }

    get job() {return this._job}

};
