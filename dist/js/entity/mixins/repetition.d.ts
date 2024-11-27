import { InMemoryEntityConstructor } from "../in_memory";
export interface HasRepetition {
    setRepetition: (repetition: number) => void;
}
type Units = HasRepetition[];
type Workflows = HasRepetition[];
type Subworkflows = HasRepetition[];
export declare function HasRepetitionMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        _repetition: number;
        _totalRepetitions: number;
        units: Units;
        workflows: Workflows;
        subworkflows: Subworkflows;
        readonly repetition: number;
        setRepetition(repetition: number): void;
        readonly totalRepetitions: number;
        setTotalRepetitions(totalRepetition: number): void;
        _json: import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        prop<T_1 = undefined>(name: string, defaultValue: T_1): T_1;
        prop<T_2 = undefined>(name: string): T_2 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: import("@mat3ra/esse/dist/js/esse/types").AnyObject): any;
        toJSON(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        toJSONSafe(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        toJSONQuick(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        clone(extraContext?: object | undefined): any;
        validate(): void;
        clean(config: import("@mat3ra/esse/dist/js/esse/types").AnyObject): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        isValid(): boolean;
        readonly cls: string;
        getClsName(): string;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/dist/js/types").EntityReferenceSchema;
        getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
        id: string;
        _id: string;
        schemaVersion: string;
        systemName: string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
    };
} & T;
export {};
