/* eslint-disable @typescript-eslint/no-explicit-any */
import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import { type InMemoryEntity } from "../in_memory";

export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];

export type InMemoryEntitySet = {
    containsEntity(entity?: SystemInSetSchema): boolean;
};

export function inMemoryEntitySetMixin<T extends InMemoryEntity>(item: T) {
    // @ts-expect-error
    const properties: InMemoryEntity & InMemoryEntitySet = {
        containsEntity(entity?: SystemInSetSchema) {
            return Boolean(entity?.inSet?.some((ref) => ref._id === this.id));
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}
