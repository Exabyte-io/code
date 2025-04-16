import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { InMemoryEntityConstructor } from "../in_memory";
export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];
export default function InMemoryEntityInSetMixin<S extends InMemoryEntityConstructor = InMemoryEntityConstructor>(superclass: S): S & Constructor<InstanceType<S> & {
    inSet: InSet[];
}> & Constructor<InstanceType<S> & {
    inSet: InSet[];
} & {
    getInSetFilteredByCls(cls: string): {
        _id: string;
        cls?: string;
        slug?: string;
        type?: string;
        index?: number;
    }[];
    readonly parentEntitySetReference: {
        _id: string;
        cls?: string;
        slug?: string;
        type?: string;
        index?: number;
    } | undefined;
}>;
