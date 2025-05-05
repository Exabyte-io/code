import type { ConsistencyCheck, HasConsistencyCheckSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";

function schemaMixin(item: InMemoryEntity) {
    const schema = {
        get consistencyChecks(): ConsistencyCheck[] {
            return item.prop("consistencyChecks", []);
        },
        set consistencyChecks(array: ConsistencyCheck[]) {
            item.setProp("consistencyChecks", array);
        },
    } satisfies HasConsistencyCheckSchema;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));

    return schema;
}

function propertiesMixin(item: InMemoryEntity & HasConsistencyCheckSchema) {
    const properties = {
        addConsistencyChecks(array: ConsistencyCheck[]) {
            item.consistencyChecks = [...(item.consistencyChecks || []), ...array];
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export function hasConsistencyChecksMixin(item: InMemoryEntity) {
    return {
        ...schemaMixin(item),
        ...propertiesMixin(item),
    };
}

export type HasConsistencyChecksInMemoryEntity = ReturnType<typeof hasConsistencyChecksMixin>;
export type HasConsistencyChecksInMemoryEntityConstructor =
    Constructor<HasConsistencyChecksInMemoryEntity>;

export default function HasConsistencyChecksMixin<S extends InMemoryEntityConstructor>(
    superclass: S,
) {
    class HasConsistencyChecksMixin extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);
            hasConsistencyChecksMixin(this);
        }
    }

    return HasConsistencyChecksMixin as S & HasConsistencyChecksInMemoryEntityConstructor;
}
