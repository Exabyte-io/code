/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ApplicationSchemaBase,
    JobSchema,
    MaterialSchema,
    WorkflowSchema,
} from "@mat3ra/esse/dist/js/types";
import CryptoJS from "crypto-js";

import { InMemoryEntity } from "../entity";
import { DefaultableMixin } from "../entity/mixins/props";
import { compareEntitiesInOrderedSetForSorting } from "../entity/set/ordered/utils";

type Constructor<T = any> = new (...args: any[]) => T;

type Defaultable = ReturnType<typeof DefaultableMixin>;

export function ApplicationContextMixin<T extends Constructor>(superclass: T) {
    return class ApplicationContextMixin extends superclass {
        _application: ApplicationSchemaBase;

        constructor(...args: any) {
            super(...args);
            // @ts-ignore
            if (!this.constructor.Application) {
                throw Error("ApplicationContextMixin: Application is undefined");
            }
            const config = args[0];
            this._application =
                (config.context && config.context.application) ||
                // @ts-ignore
                (this.constructor.Application as Defaultable).createDefault();
        }

        get application() {
            return this._application;
        }
    };
}

type Material = InMemoryEntity &
    MaterialSchema & {
        hash: string;
    };

export function MaterialContextMixin<T extends Constructor>(superclass: T) {
    return class MaterialContextMixin extends superclass {
        _material: Material;

        extraData?: {
            materialHash: string;
        };

        declare isEdited?: boolean;

        constructor(...args: any) {
            super(...args);
            // @ts-ignore
            if (!this.constructor.Material) {
                throw Error("MaterialContextMixin: Material is undefined");
            }
            const config = args[0];
            this._material = config.context && config.context.material;
            // @ts-ignore
            if (!this._material)
                // @ts-ignore
                this._material = (this.constructor.Material as Defaultable).createDefault();
            this.updateMaterialHash();
        }

        // eslint-disable-next-line class-methods-use-this
        get isEditedIsSetToFalseOnMaterialUpdate() {
            return false;
        }

        updateMaterialHash() {
            if (this.isEditedIsSetToFalseOnMaterialUpdate) this.isEdited = false;
            this.extraData = { materialHash: this.material.hash };
        }

        // Workaround: Material.createDefault() used to initiate workflow reducer and hence here too
        //  does not have an id. Here we catch when such material is used and avoid resetting isEdited
        get isMaterialCreatedDefault() {
            return !this.material.id;
        }

        get isMaterialUpdated() {
            return Boolean(this.extraData && this.extraData.materialHash !== this.material.hash);
        }

        get material() {
            return this._material;
        }
    };
}

export function MaterialsSetContextMixin<T extends Constructor>(superclass: T) {
    return class MaterialsSetContextMixin extends superclass {
        _materialsSet: any;

        constructor(...params: any) {
            super(...params);
            this._materialsSet = this.config.context && this.config.context.materialsSet;
        }

        get materialsSet() {
            return this._materialsSet;
        }

        sortMaterialsByIndexInSet(materials = []) {
            // DO NOT SORT IN PLACE AS IT CHANGES THE ORDER IN `this.materials` AND HAS SIDE EFFECTS (MaterialViewer).
            return materials.concat().sort((a, b) => {
                return compareEntitiesInOrderedSetForSorting(a, b, this.materialsSet._id, false);
            });
        }
    };
}

export function MaterialsContextMixin<T extends Constructor>(superclass: T) {
    return class MaterialsContextMixin extends superclass {
        _materials: any;

        constructor(...params: any) {
            super(...params);
            const materials = this.config.context && this.config.context.materials;
            // @ts-ignore
            if (!this.constructor.Material) {
                throw Error("MaterialsContextMixin: Material is undefined");
            }
            this._materials =
                materials && materials.length
                    ? materials
                    : // @ts-ignore
                      [this.constructor.Material.createDefault()];
        }

        get materials() {
            return this._materials;
        }
    };
}

export function MethodDataContextMixin<T extends Constructor>(superclass: T) {
    return class extends superclass {
        _methodData: any;

        isEdited: boolean;

        methodDataHash?: string;

        extraData?: {
            methodDataHash?: string;
        };

        constructor(...params: any) {
            super(...params);

            const config = params[0];

            this._methodData = (config.context && config.context.methodData) || {};
            this.isEdited = false; // we always get the `defaultData` (recalculated from scratch, not persistent)
        }

        /* @summary Replace the logic in constructor with this in order to enable passing `methodDataHash` between
         *          subsequent initializations of the derived class. Not used at present and kept for the record.
         */
        _initMethodDataHash() {
            this.methodDataHash = CryptoJS.MD5(JSON.stringify(this.methodData)).toString();
            this.extraData = { methodDataHash: this.methodDataHash };
            if (!this._methodData) {
                this._methodData = {};
                this.isEdited = false;
                // Commented out to reduce effect on performance. Uncomment for debugging purposes.
                // TODO: remove on next refactoring or convert to log
                // console.warn("MethodDataContextMixin: methodData is undefined or null");
            } else if (this.isMethodDataUpdated) {
                this.isEdited = false;
            } else {
                // @ts-ignore
                // eslint-disable-next-line no-undef
                this.isEdited = config.isEdited;
            }
        }

        get methodData() {
            return this._methodData;
        }

        get isMethodDataUpdated() {
            return Boolean(this.extraData && this.extraData.methodDataHash !== this.methodDataHash);
        }
    };
}

export function WorkflowContextMixin<T extends Constructor>(superclass: T) {
    return class extends superclass {
        _workflow: WorkflowSchema;

        isEdited: boolean;

        constructor(...params: any) {
            super(...params);

            const config = params[0];

            this._workflow = (config.context && config.context.workflow) || {};
            this.isEdited = false; // we always get the `defaultData` (recalculated from scratch, not persistent)
        }

        get workflow() {
            return this._workflow;
        }
    };
}

export function JobContextMixin<T extends Constructor>(superclass: T) {
    return class extends superclass {
        _job: JobSchema;

        isEdited: boolean;

        constructor(...params: any) {
            super(...params);

            const config = params[0];

            this._job = (config.context && config.context.job) || {};
            this.isEdited = false; // we always get the `defaultData` (recalculated from scratch, not persistent)
        }

        get job() {
            return this._job;
        }
    };
}
