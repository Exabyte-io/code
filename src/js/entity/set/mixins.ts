import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import { InMemoryEntityConstructor } from "../in_memory";

export function InMemoryEntityInSetMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class InMemoryEntityInSetMixin extends superclass {
        get inSet() {
            return this.prop("inSet", []);
        }

        set inSet(inSet: Required<SystemInSetSchema>["inSet"]) {
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
        containsEntity<T extends InstanceType<ReturnType<typeof InMemoryEntityInSetMixin>>>(
            entity?: T,
        ) {
            return entity?.inSet?.some((ref) => ref._id === this.id);
        }
    };
}
