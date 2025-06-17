"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationContextMixin = ApplicationContextMixin;
function ApplicationContextMixin(superclass) {
    return class ApplicationContextMixin extends superclass {
        constructor(...args) {
            super(...args);
            // @ts-ignore
            if (!this.constructor.Application) {
                throw Error("ApplicationContextMixin: Application is undefined");
            }
            const config = args[0];
            this._application =
                (config.context && config.context.application) ||
                    // @ts-ignore
                    this.constructor.Application.createDefault();
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
