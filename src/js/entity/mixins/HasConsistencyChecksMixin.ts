import type { ConsistencyCheck } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

export function hasConsistencyChecksMixin<T extends InMemoryEntity>(item: T) {
    // @ts-expect-error
    const properties: InMemoryEntity & HasConsistencyChecksInMemoryEntity = {
        get consistencyChecks(): ConsistencyCheck[] {
            return this.prop("consistencyChecks", []);
        },
        set consistencyChecks(array: ConsistencyCheck[]) {
            this.setProp("consistencyChecks", array);
        },
        addConsistencyChecks(array: ConsistencyCheck[]) {
            this.consistencyChecks = [...(this.consistencyChecks || []), ...array];
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export type HasConsistencyChecksInMemoryEntity = {
    consistencyChecks: ConsistencyCheck[];
    addConsistencyChecks: (array: ConsistencyCheck[]) => void;
};

export type HasConsistencyChecksInMemoryEntityConstructor =
    Constructor<HasConsistencyChecksInMemoryEntity>;
