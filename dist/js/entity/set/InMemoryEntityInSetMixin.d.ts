import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { type InMemoryEntity } from "../in_memory";
export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];
export declare function entityInSetPropsMixin<E extends InMemoryEntity>(item: E): {
    inSet: InSet[];
};
export declare function entityInSetMethodsMixin<E extends InMemoryEntity>(item: E & InMemoryEntityInSetProps): {
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
type InMemoryEntityInSetProps = ReturnType<typeof entityInSetPropsMixin>;
type InMemoryEntityInSetPropsConstructor = Constructor<InMemoryEntityInSetProps>;
type InMemoryEntityInSetMethods = ReturnType<typeof entityInSetMethodsMixin>;
type InMemoryEntityInSetMethodsConstructor = Constructor<InMemoryEntityInSetMethods>;
export type InMemoryEntityInSet = InMemoryEntityInSetProps & InMemoryEntityInSetMethods;
export type InMemoryEntityInSetConstructor = InMemoryEntityInSetPropsConstructor & InMemoryEntityInSetMethodsConstructor;
type Base = Constructor<InMemoryEntity>;
export default function InMemoryEntityInSetMixin<S extends Base = Base>(superclass: S): S & InMemoryEntityInSetConstructor;
export {};
