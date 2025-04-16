/* eslint-disable @typescript-eslint/no-explicit-any */
import { SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { type InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";

export type SystemInSet = Required<SystemInSetSchema>;
export type InSet = SystemInSet["inSet"][0];

function props<T extends InMemoryEntity>(item: T) {
    return Object.assign(item, {
        get inSet() {
            return item.prop<InSet[]>("inSet", []);
        },

        set inSet(inSet: InSet[]) {
            item.setProp("inSet", inSet);
        },
    } satisfies SystemInSetSchema);
}

function methods<T extends InMemoryEntity>(item: T & ReturnType<typeof props<T>>) {
    return Object.assign(item, {
        getInSetFilteredByCls(cls: string) {
            return item.inSet.filter((ref) => ref.cls === cls);
        },

        // finds a parent entity set of the same cls (hence `cls` field is absent)
        // NOTE: assumes that only one entry of this kind is present => gets the first one
        get parentEntitySetReference() {
            return item.inSet.find((item) => item._id && !item.cls);
        },
    });
}

export default function InMemoryEntityInSetMixin<
    S extends InMemoryEntityConstructor = InMemoryEntityConstructor,
>(superclass: S) {
    type Props = Constructor<ReturnType<typeof props<InstanceType<S>>>>;
    type Methods = Constructor<ReturnType<typeof methods<InstanceType<S>>>>;

    class InMemoryEntityInSetMixin extends superclass {
        constructor(...args: any[]) {
            super(...args);
            props(this);
            methods(this as ReturnType<typeof props<InstanceType<S>>>);
        }
    }

    return InMemoryEntityInSetMixin as S & Props & Methods;
}
