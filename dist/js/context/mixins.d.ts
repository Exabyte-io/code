import { ApplicationSchemaBase } from "@mat3ra/esse/dist/js/types";
import type { OrderedInMemoryEntityInSet } from "../entity/set/ordered/OrderedInMemoryEntityInSetMixin";
import { JobContextMixin } from "./JobContextMixin";
import { MaterialContextMixin } from "./MaterialContextMixin";
import { MaterialsContextMixin } from "./MaterialsContextMixin";
import { MethodDataContextMixin } from "./MethodDataContextMixin";
import { WorkflowContextMixin } from "./WorkflowContextMixin";
type Constructor<T = any> = new (...args: any[]) => T;
export declare function ApplicationContextMixin<T extends Constructor>(superclass: T): {
    new (...args: any): {
        [x: string]: any;
        _application: ApplicationSchemaBase;
        readonly application: ApplicationSchemaBase;
    };
} & T;
export { MaterialContextMixin, MaterialsContextMixin, MethodDataContextMixin, WorkflowContextMixin, JobContextMixin, };
export declare function MaterialsSetContextMixin<T extends Constructor>(superclass: T): {
    new (...params: any): {
        [x: string]: any;
        _materialsSet: any;
        readonly materialsSet: any;
        sortMaterialsByIndexInSet(materials?: OrderedInMemoryEntityInSet[]): {
            getIndexByIdInOrderedSet(setId: string): number;
        }[];
    };
} & T;
