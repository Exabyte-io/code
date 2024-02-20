import { InMemoryEntity } from "../entity";
import { ApplicationSchemaBase, JobSchema, MaterialSchema, WorkflowSchema } from "@mat3ra/esse/lib/js/types";
type Constructor<T = any> = new (...args: any[]) => T;
export declare function ApplicationContextMixin<T extends Constructor>(superclass: T): {
    new (...args: any): {
        [x: string]: any;
        _application: ApplicationSchemaBase;
        readonly application: ApplicationSchemaBase;
    };
} & T;
type Material = InMemoryEntity & MaterialSchema & {
    hash: string;
};
export declare function MaterialContextMixin<T extends Constructor>(superclass: T): {
    new (...args: any): {
        [x: string]: any;
        _material: Material;
        extraData?: {
            materialHash: string;
        };
        isEdited?: boolean;
        readonly isEditedIsSetToFalseOnMaterialUpdate: boolean;
        updateMaterialHash(): void;
        readonly isMaterialCreatedDefault: boolean;
        readonly isMaterialUpdated: boolean;
        readonly material: Material;
    };
} & T;
export declare function MaterialsSetContextMixin<T extends Constructor>(superclass: T): {
    new (...params: any): {
        [x: string]: any;
        _materialsSet: any;
        readonly materialsSet: any;
        sortMaterialsByIndexInSet(materials?: any[]): any[];
    };
} & T;
export declare function MaterialsContextMixin<T extends Constructor>(superclass: T): {
    new (...params: any): {
        [x: string]: any;
        _materials: any;
        readonly materials: any;
    };
} & T;
export declare function MethodDataContextMixin<T extends Constructor>(superclass: T): {
    new (...params: any): {
        [x: string]: any;
        _methodData: any;
        isEdited: boolean;
        methodDataHash?: string;
        extraData?: {
            methodDataHash?: string;
        };
        _initMethodDataHash(): void;
        readonly methodData: any;
        readonly isMethodDataUpdated: boolean;
    };
} & T;
export declare function WorkflowContextMixin<T extends Constructor>(superclass: T): {
    new (...params: any): {
        [x: string]: any;
        _workflow: WorkflowSchema;
        isEdited: boolean;
        readonly workflow: WorkflowSchema;
    };
} & T;
export declare function JobContextMixin<T extends Constructor>(superclass: T): {
    new (...params: any): {
        [x: string]: any;
        _job: JobSchema;
        isEdited: boolean;
        readonly job: JobSchema;
    };
} & T;
export {};
