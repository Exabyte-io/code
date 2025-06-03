import type { ConsistencyCheck } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";
export declare function hasConsistencyChecksMixin(item: InMemoryEntity): {
    addConsistencyChecks(array: ConsistencyCheck[]): void;
    consistencyChecks: ConsistencyCheck[];
};
export type HasConsistencyChecksInMemoryEntity = ReturnType<typeof hasConsistencyChecksMixin>;
export type HasConsistencyChecksInMemoryEntityConstructor = Constructor<HasConsistencyChecksInMemoryEntity>;
export default function HasConsistencyChecksMixin<S extends InMemoryEntityConstructor>(superclass: S): S & HasConsistencyChecksInMemoryEntityConstructor;
