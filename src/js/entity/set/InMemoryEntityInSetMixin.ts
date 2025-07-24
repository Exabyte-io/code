/* eslint-disable @typescript-eslint/no-explicit-any */
import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { type InMemoryEntity } from "../in_memory";

export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];

export function inMemoryEntityInSetMixin<E extends InMemoryEntity>(item: E) {
    // @ts-expect-error
    const properties: SystemInSet & InSetPropertiesInMemoryEntity & E = {
        get inSet() {
            return this.prop<InSet[]>("inSet", []);
        },

        set inSet(inSet: InSet[]) {
            this.setProp("inSet", inSet);
        },

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
export type InMemoryEntityInSetConstructor = Constructor<InMemoryEntityInSet>;

type Base = Constructor<InMemoryEntity>;

export default function InMemoryEntityInSetMixin<S extends Base = Base>(superclass: S) {
    class InMemoryEntityInSetMixin extends superclass {}

    inMemoryEntityInSetMixin(InMemoryEntityInSetMixin.prototype);

    return InMemoryEntityInSetMixin as S & InMemoryEntityInSetConstructor;
}
