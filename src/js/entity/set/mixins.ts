import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import { InMemoryEntityConstructor } from "../in_memory";

export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];

export function InMemoryEntityInSetMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class InMemoryEntityInSetMixin extends superclass implements SystemInSet {
        get inSet() {
            return this.prop<InSet[]>("inSet", []);
        }

        set inSet(inSet: InSet[]) {
            this.setProp("inSet", inSet);
        }

        getInSetFilteredByCls(cls: string) {
            return this.inSet.filter((ref) => ref.cls === cls);
        }

        // finds a parent entity set of the same cls (hence `cls` field is absent)
        // NOTE: assumes that only one entry of this kind is present => gets the first one
        get parentEntitySetReference() {
            return this.inSet.find((item) => item._id && !item.cls);
        }
    };
}

export function InMemoryEntitySetMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class InMemoryEntitySetMixin extends superclass {
        containsEntity<T extends SystemInSetSchema>(entity?: T) {
            return Boolean(entity?.inSet?.some((ref) => ref._id === this.id));
        }
    };
}
