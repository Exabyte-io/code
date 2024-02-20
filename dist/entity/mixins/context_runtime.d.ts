import { JobBaseSchema } from "@mat3ra/esse/lib/js/types";
import { InMemoryEntityConstructor } from "../in_memory";
type RuntimeContext = Required<JobBaseSchema>["runtimeContext"];
export declare function RuntimeContextFieldMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        _runtimeContext: RuntimeContext;
        runtimeContext: {};
        updateRuntimeContext(ctx?: RuntimeContext): void;
        toJSON(exclude?: string[]): {
            runtimeContext: {};
        };
        _json: import("../in_memory").AnyObject;
        prop<T_1 = null>(name: string, defaultValue?: T_1): T_1;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        toJSONSafe(exclude?: string[]): import("../in_memory").AnyObject;
        toJSONQuick(exclude?: string[]): import("../in_memory").AnyObject;
        clone(extraContext?: object): any;
        validate(): void;
        clean(config: import("../in_memory").AnyObject): import("../in_memory").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
        getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): any;
    };
} & T;
export {};
