import type { Constructor } from "../../utils/types";
import { InMemoryEntityConstructor } from "../in_memory";
export default function DefaultableMixin<S extends InMemoryEntityConstructor>(superclass: S): S & Constructor<InstanceType<S> & {
    isDefault: boolean;
}> & Constructor<S & {
    readonly defaultConfig: object | null;
    createDefault(): S;
}>;
