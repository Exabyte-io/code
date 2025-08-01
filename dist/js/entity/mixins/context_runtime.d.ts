import { JobBaseSchema } from "@mat3ra/esse/dist/js/types";
import { InMemoryEntityConstructor } from "../in_memory";
type RuntimeContext = Required<JobBaseSchema>["runtimeContext"];
export declare function RuntimeContextFieldMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        _runtimeContext: RuntimeContext;
        runtimeContext: RuntimeContext;
        updateRuntimeContext(ctx?: RuntimeContext): void;
        toJSON(exclude?: string[]): {
            runtimeContext: {};
        };
        _json: import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        prop<T_1 = undefined>(name: string, defaultValue: T_1): T_1;
        prop<T_1 = undefined>(name: string): T_1 | undefined;
        requiredProp<T_1>(name: string): T_1;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: import("@mat3ra/esse/dist/js/esse/types").AnyObject): /*elided*/ any;
        toJSONSafe(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        toJSONQuick(exclude?: string[]): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        clone(extraContext?: object): /*elided*/ any;
        validate(): void;
        clean(config: import("@mat3ra/esse/dist/js/esse/types").AnyObject): import("@mat3ra/esse/dist/js/esse/types").AnyObject;
        isValid(): boolean;
        readonly cls: string;
        getClsName(): string;
        getAsEntityReference(byIdOnly: true): {
            _id: string;
        };
        getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
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
