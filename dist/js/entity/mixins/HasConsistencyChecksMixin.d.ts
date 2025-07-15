import type { ConsistencyCheck } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
export declare function hasConsistencyChecksMixin<T extends InMemoryEntity>(item: T): InMemoryEntity & HasConsistencyChecksInMemoryEntity;
export type HasConsistencyChecksInMemoryEntity = {
    consistencyChecks: ConsistencyCheck[];
    addConsistencyChecks: (array: ConsistencyCheck[]) => void;
};
export type HasConsistencyChecksInMemoryEntityConstructor = Constructor<HasConsistencyChecksInMemoryEntity>;
