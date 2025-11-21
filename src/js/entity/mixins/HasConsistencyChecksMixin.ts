import type { ConsistencyCheck } from "@mat3ra/esse/dist/js/types";

import {
    type HasConsistencyChecksSchemaMixin,
    hasConsistencyChecksSchemaMixin,
} from "../../generated/HasConsistencyChecksSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

type HasConsistencyChecksProperties = {
    addConsistencyChecks: (array: ConsistencyCheck[]) => void;
};

export type HasConsistencyChecks = HasConsistencyChecksSchemaMixin & HasConsistencyChecksProperties;

export type HasConsistencyChecksInMemoryEntity = HasConsistencyChecks;

export type HasConsistencyChecksInMemoryEntityConstructor = Constructor<HasConsistencyChecks>;

export function hasConsistencyChecksMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & HasConsistencyChecks {
    hasConsistencyChecksSchemaMixin(item);

    // @ts-expect-error
    const properties: InMemoryEntity & HasConsistencyChecks = {
        addConsistencyChecks(array: ConsistencyCheck[]) {
            this.consistencyChecks = [...(this.consistencyChecks || []), ...array];
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
