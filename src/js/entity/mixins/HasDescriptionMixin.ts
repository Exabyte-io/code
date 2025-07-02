import type { DescriptionSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

export function hasDescriptionMixin<T extends InMemoryEntity>(item: T) {
    // @ts-expect-error
    const properties: InMemoryEntity & HasDescriptionInMemoryEntity = {
        get description(): string {
            return this.prop("description", "");
        },
        set description(string: string) {
            this.setProp("description", string);
        },
        get descriptionObject() {
            return this.prop<DescriptionSchema["descriptionObject"]>("descriptionObject");
        },
        set descriptionObject(obj: DescriptionSchema["descriptionObject"]) {
            this.setProp("descriptionObject", obj);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export type HasDescriptionInMemoryEntity = {
    description: string;
    descriptionObject: DescriptionSchema["descriptionObject"];
};

export type HasDescriptionInMemoryEntityConstructor = Constructor<HasDescriptionInMemoryEntity>;
