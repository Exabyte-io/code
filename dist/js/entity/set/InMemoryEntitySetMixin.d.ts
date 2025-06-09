import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { type InMemoryEntity } from "../in_memory";
export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];
export declare function inMemoryEntitySetMixin<T extends InMemoryEntity>(item: T): {
    containsEntity<T_1 extends SystemInSetSchema>(entity?: T_1): boolean;
};
export type InMemoryEntitySet = ReturnType<typeof inMemoryEntitySetMixin>;
export type InMemoryEntitySetConstructor = Constructor<InMemoryEntitySet>;
type Base = Constructor<InMemoryEntity>;
export default function InMemoryEntitySetMixin<S extends Base = Base>(superclass: S): S & InMemoryEntitySetConstructor;
export {};
