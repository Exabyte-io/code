import type { DescriptionSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";
export declare function hasDescriptionMixin(item: InMemoryEntity): {
    description: string;
    descriptionObject: DescriptionSchema["descriptionObject"];
};
export type HasDescriptionInMemoryEntity = ReturnType<typeof hasDescriptionMixin>;
export type HasDescriptionInMemoryEntityConstructor = Constructor<HasDescriptionInMemoryEntity>;
export default function HasDescriptionMixin<S extends InMemoryEntityConstructor>(superclass: S): S & HasDescriptionInMemoryEntityConstructor;
