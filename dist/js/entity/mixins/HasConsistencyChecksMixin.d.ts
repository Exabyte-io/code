import type { ConsistencyCheck } from "@mat3ra/esse/dist/js/types";
import { type HasConsistencyChecksSchemaMixin } from "../../generated/HasConsistencyChecksSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
type HasConsistencyChecksProperties = {
    addConsistencyChecks: (array: ConsistencyCheck[]) => void;
};
export type HasConsistencyChecks = HasConsistencyChecksSchemaMixin & HasConsistencyChecksProperties;
export type HasConsistencyChecksInMemoryEntity = HasConsistencyChecks;
export type HasConsistencyChecksInMemoryEntityConstructor = Constructor<HasConsistencyChecks>;
export declare function hasConsistencyChecksMixin<T extends InMemoryEntity>(item: T): asserts item is T & HasConsistencyChecks;
export {};
