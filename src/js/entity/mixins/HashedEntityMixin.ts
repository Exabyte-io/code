import { type HasDescriptionSchemaMixin } from "../../generated/HasDescriptionSchemaMixin";
import { calculateHashFromObject } from "../../utils/hash";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

type HashedEntityProperties = {
    calculateHash: () => string;
    getHashObject?: () => object;
};

export function hashedEntityMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & HashedEntityProperties {
    // @ts-expect-error
    const properties: InMemoryEntity & HashedEntityProperties = {
        /**
         * @summary Calculates hash based on meaningful fields and unit-specific fields. Unit-specific fields are
         *          separated into _typeSpecificHash function which can be overwritten by child classes.
         *          head and next are also important but not considered since they are included in subworkflow hash.
         */
        calculateHash() {
            return calculateHashFromObject(this.getHashObject?.() ?? {});
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export type HasDescriptionInMemoryEntity = HasDescriptionSchemaMixin;

export type HasDescriptionInMemoryEntityConstructor = Constructor<HasDescriptionInMemoryEntity>;
