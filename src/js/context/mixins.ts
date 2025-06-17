/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationSchemaBase } from "@mat3ra/esse/dist/js/types";

import { DefaultableMixin } from "../entity/mixins/props";
// import type { OrderedInMemoryEntityInSet } from "../entity/set/ordered/OrderedInMemoryEntityInSetMixin";
// import { compareEntitiesInOrderedSetForSorting } from "../entity/set/ordered/utils";
// import { JobContextMixin } from "./JobContextMixin";
// import { MaterialContextMixin } from "./MaterialContextMixin";
// import { MaterialsContextMixin } from "./MaterialsContextMixin";
// import { MethodDataContextMixin } from "./MethodDataContextMixin";
// import { WorkflowContextMixin } from "./WorkflowContextMixin";

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

// export {
//     MaterialContextMixin,
//     MaterialsContextMixin,
//     MethodDataContextMixin,
//     WorkflowContextMixin,
//     JobContextMixin,
// };

// export function MaterialsSetContextMixin<T extends Constructor>(superclass: T) {
//     return class MaterialsSetContextMixin extends superclass {
//         _materialsSet: any;

//         constructor(...params: any) {
//             super(...params);
//             this._materialsSet = this.config.context && this.config.context.materialsSet;
//         }

//         get materialsSet() {
//             return this._materialsSet;
//         }

//         sortMaterialsByIndexInSet(materials: OrderedInMemoryEntityInSet[] = []) {
//             // DO NOT SORT IN PLACE AS IT CHANGES THE ORDER IN `this.materials` AND HAS SIDE EFFECTS (MaterialViewer).
//             return materials.concat().sort((a, b) => {
//                 return compareEntitiesInOrderedSetForSorting(a, b, this.materialsSet._id, false);
//             });
//         }
//     };
// }
