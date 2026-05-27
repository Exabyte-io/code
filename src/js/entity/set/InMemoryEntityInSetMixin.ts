/* eslint-disable @typescript-eslint/no-explicit-any */
import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import { inSetSchemaMixin } from "../../generated/InSetSchemaMixin";
import { type InMemoryEntity } from "../in_memory";

export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];

export function inMemoryEntityInSetMixin<E extends InMemoryEntity>(
    item: E,
): asserts item is E & InMemoryEntityInSet {
    inSetSchemaMixin<E>(item);

    // @ts-expect-error
    const properties: InMemoryEntity & InMemoryEntityInSet = {
        getInSetFilteredByCls(cls: string) {
            return this.inSet.filter((ref) => ref.cls === cls);
        },

        // finds a parent entity set of the same cls (hence `cls` field is absent)
        // NOTE: assumes that only one entry of this kind is present => gets the first one
        get parentEntitySetReference() {
            return this.inSet.find((inSetItem) => inSetItem._id && !inSetItem.cls);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export type InSetPropertiesInMemoryEntity = {
    getInSetFilteredByCls: (cls: string) => InSet[];
    parentEntitySetReference: InSet | undefined;
};

export type InMemoryEntityInSet = SystemInSet & InSetPropertiesInMemoryEntity;
