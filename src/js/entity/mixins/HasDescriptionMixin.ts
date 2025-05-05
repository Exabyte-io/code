import type { DescriptionSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";

function schemaMixin(item: InMemoryEntity) {
    const schema = {
        get description(): string {
            return item.prop("description", "");
        },
        set description(string: string) {
            item.setProp("description", string);
        },
        get descriptionObject() {
            return item.prop<DescriptionSchema["descriptionObject"]>("descriptionObject");
        },
        set descriptionObject(obj: DescriptionSchema["descriptionObject"]) {
            item.setProp("descriptionObject", obj);
        },
    } satisfies DescriptionSchema;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));

    return schema;
}

export function hasDescriptionMixin(item: InMemoryEntity) {
    return schemaMixin(item);
}

export type HasDescriptionInMemoryEntity = ReturnType<typeof hasDescriptionMixin>;
export type HasDescriptionInMemoryEntityConstructor = Constructor<HasDescriptionInMemoryEntity>;

export default function HasDescriptionMixin<S extends InMemoryEntityConstructor>(superclass: S) {
    class HasDescriptionMixin extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);
            hasDescriptionMixin(this);
        }
    }

    return HasDescriptionMixin as S & HasDescriptionInMemoryEntityConstructor;
}
