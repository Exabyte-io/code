import type { Constructor } from "../../utils/types";
import { InMemoryEntityConstructor } from "../in_memory";
export default function NamedEntityMixin<S extends InMemoryEntityConstructor>(superclass: S): S & Constructor<InstanceType<S> & {
    name: string;
}> & Constructor<InstanceType<S> & {
    setName(name: string): void;
}>;
