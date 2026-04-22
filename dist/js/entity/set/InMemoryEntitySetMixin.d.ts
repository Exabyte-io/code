import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";
import { type InMemoryEntity } from "../in_memory";
export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];
export type InMemoryEntitySet = {
    containsEntity(entity?: SystemInSetSchema): boolean;
};
export declare function inMemoryEntitySetMixin<T extends InMemoryEntity>(item: T): InMemoryEntity & InMemoryEntitySet;
