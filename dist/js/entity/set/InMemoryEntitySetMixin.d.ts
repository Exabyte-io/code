import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { InMemoryEntityConstructor } from "../in_memory";
export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];
export default function InMemoryEntitySetMixin<S extends InMemoryEntityConstructor = InMemoryEntityConstructor>(superclass: S): S & Constructor<InstanceType<S> & {
    containsEntity<T extends SystemInSetSchema>(entity?: T | undefined): boolean;
}>;
