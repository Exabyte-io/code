import { ApplicationSchemaBase } from "@mat3ra/esse/dist/js/types";
type Constructor<T = any> = new (...args: any[]) => T;
export declare function ApplicationContextMixin<T extends Constructor>(superclass: T): {
    new (...args: any): {
        [x: string]: any;
        _application: ApplicationSchemaBase;
        readonly application: ApplicationSchemaBase;
    };
} & T;
export {};
