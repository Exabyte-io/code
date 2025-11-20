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

export function hasConsistencyChecksMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & HasConsistencyChecksProperties {
    hasConsistencyChecksSchemaMixin(item);

    // @ts-expect-error
    const properties: InMemoryEntity &
        HasConsistencyChecksSchemaMixin &
        HasConsistencyChecksProperties = {
        addConsistencyChecks(array: ConsistencyCheck[]) {
            this.consistencyChecks = [...(this.consistencyChecks || []), ...array];
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export type HasConsistencyChecksInMemoryEntity = HasConsistencyChecksSchemaMixin &
    HasConsistencyChecksProperties;

export type HasConsistencyChecksInMemoryEntityConstructor =
    Constructor<HasConsistencyChecksInMemoryEntity>;
