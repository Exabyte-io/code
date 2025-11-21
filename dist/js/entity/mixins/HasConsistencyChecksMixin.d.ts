import type { ConsistencyCheck } from "@mat3ra/esse/dist/js/types";
import { type HasConsistencyChecksSchemaMixin } from "../../generated/HasConsistencyChecksSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
type HasConsistencyChecksProperties = {
    addConsistencyChecks: (array: ConsistencyCheck[]) => void;
};
type HasConsistencyChecks = HasConsistencyChecksSchemaMixin & HasConsistencyChecksProperties;
export declare function hasConsistencyChecksMixin<T extends InMemoryEntity>(item: T): asserts item is T & HasConsistencyChecks;
export type HasConsistencyChecksInMemoryEntity = HasConsistencyChecksSchemaMixin & HasConsistencyChecksProperties;
export type HasConsistencyChecksInMemoryEntityConstructor = Constructor<HasConsistencyChecksInMemoryEntity>;
export {};
