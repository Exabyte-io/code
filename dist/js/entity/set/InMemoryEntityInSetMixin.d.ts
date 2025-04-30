import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { type InMemoryEntity } from "../in_memory";
export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];
export declare function inMemoryEntityInSetMixin<E extends InMemoryEntity>(item: E): {
    getInSetFilteredByCls(cls: string): {
        _id: string;
        cls?: string;
        slug?: string;
        type?: string;
        index?: number;
    }[];
    parentEntitySetReference: {
        _id: string;
        cls?: string;
        slug?: string;
        type?: string;
        index?: number;
    } | undefined;
    inSet: InSet[];
};
export type InMemoryEntityInSet = ReturnType<typeof inMemoryEntityInSetMixin>;
export type InMemoryEntityInSetConstructor = Constructor<InMemoryEntityInSet>;
type Base = Constructor<InMemoryEntity>;
export default function InMemoryEntityInSetMixin<S extends Base = Base>(superclass: S): S & InMemoryEntityInSetConstructor;
export {};
