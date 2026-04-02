import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import { type InMemoryEntity } from "../in_memory";
export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];
export declare function inMemoryEntityInSetMixin<E extends InMemoryEntity>(item: E): asserts item is E & InMemoryEntityInSet;
export type InSetPropertiesInMemoryEntity = {
    getInSetFilteredByCls: (cls: string) => InSet[];
    parentEntitySetReference: InSet | undefined;
};
export type InMemoryEntityInSet = SystemInSet & InSetPropertiesInMemoryEntity;
