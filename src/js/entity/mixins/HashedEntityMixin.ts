import { calculateHashFromObject } from "../../utils/hash";
import { InMemoryEntity } from "../in_memory";

export type HashedEntity = {
    calculateHash(): string;
    getHashObject?(): object;
};

export function hashedEntityMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & HashedEntity {
    // @ts-expect-error
    const properties: InMemoryEntity & HashedEntity = {
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
