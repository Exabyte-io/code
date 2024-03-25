import { ExecutionUnitInputItemSchemaForPhysicsBasedSimulationEngines } from "@mat3ra/esse/lib/js/types";
import { InMemoryEntityConstructor } from "../in_memory";
export declare function HashedEntityMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        getHashObject(): {};
        /**
         * @summary Calculates hash based on meaningful fields and unit-specific fields. Unit-specific fields are
         *          separated into _typeSpecificHash function which can be overwritten by child classes.
         *          head and next are also important but not considered since they are included in subworkflow hash.
         */
        calculateHash(): string;
        _json: import("../in_memory").AnyObject;
        prop<T = undefined>(name: string, defaultValue: T): T;
        prop<T_1 = undefined>(name: string): T_1 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: import("../in_memory").AnyObject): any;
        toJSON(exclude?: string[]): import("../in_memory").AnyObject;
        toJSONSafe(exclude?: string[]): import("../in_memory").AnyObject;
        toJSONQuick(exclude?: string[]): import("../in_memory").AnyObject;
        clone(extraContext?: object | undefined): any;
        validate(): void;
        clean(config: import("../in_memory").AnyObject): import("../in_memory").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
        getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
    };
} & T_2;
export declare function HashedInputArrayMixin<T extends InMemoryEntityConstructor>(superclass: T): {
    new (...args: any[]): {
        input: ExecutionUnitInputItemSchemaForPhysicsBasedSimulationEngines[];
        readonly hashFromArrayInputContent: string;
        _json: import("../in_memory").AnyObject;
        prop<T = undefined>(name: string, defaultValue: T): T;
        prop<T_1 = undefined>(name: string): T_1 | undefined;
        setProp(name: string, value: unknown): void;
        unsetProp(name: string): void;
        setProps(json?: import("../in_memory").AnyObject): any;
        toJSON(exclude?: string[]): import("../in_memory").AnyObject;
        toJSONSafe(exclude?: string[]): import("../in_memory").AnyObject;
        toJSONQuick(exclude?: string[]): import("../in_memory").AnyObject;
        clone(extraContext?: object | undefined): any;
        validate(): void;
        clean(config: import("../in_memory").AnyObject): import("../in_memory").AnyObject;
        isValid(): boolean;
        id: string;
        readonly cls: string;
        getClsName(): string;
        readonly slug: string;
        readonly isSystemEntity: boolean;
        getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
        getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
    };
} & T_2;
