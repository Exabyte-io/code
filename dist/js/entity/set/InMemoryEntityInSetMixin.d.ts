import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { type InMemoryEntity } from "../in_memory";
export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];
declare function schemaMixin<E extends InMemoryEntity>(item: E): {
    inSet: InSet[];
};
declare function propertiesMixin<E extends InMemoryEntity>(item: E & InMemoryEntityInSetSchema): {
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
};
export declare function inMemoryEntityInSetMixin<E extends InMemoryEntity>(item: E): void;
type InMemoryEntityInSetSchema = ReturnType<typeof schemaMixin>;
type InMemoryEntityInSetSchemaConstructor = Constructor<InMemoryEntityInSetSchema>;
type InMemoryEntityInSetProperties = ReturnType<typeof propertiesMixin>;
type InMemoryEntityInSetPropertiesConstructor = Constructor<InMemoryEntityInSetProperties>;
export type InMemoryEntityInSet = InMemoryEntityInSetSchema & InMemoryEntityInSetProperties;
export type InMemoryEntityInSetConstructor = InMemoryEntityInSetSchemaConstructor & InMemoryEntityInSetPropertiesConstructor;
type Base = Constructor<InMemoryEntity>;
export default function InMemoryEntityInSetMixin<S extends Base = Base>(superclass: S): S & InMemoryEntityInSetConstructor;
export {};
