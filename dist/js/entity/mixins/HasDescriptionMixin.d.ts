import type { DescriptionSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
export declare function hasDescriptionMixin<T extends InMemoryEntity>(item: T): InMemoryEntity & HasDescriptionInMemoryEntity;
export type HasDescriptionInMemoryEntity = {
    description: string;
    descriptionObject: DescriptionSchema["descriptionObject"];
};
export type HasDescriptionInMemoryEntityConstructor = Constructor<HasDescriptionInMemoryEntity>;
