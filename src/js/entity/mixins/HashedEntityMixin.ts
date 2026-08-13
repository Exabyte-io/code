import { type HashedSchemaMixin, hashedSchemaMixin } from "../../generated/HashedSchemaMixin";
import { calculateHashFromObject } from "../../utils/hash";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

export type HashedEntity = HashedSchemaMixin & {
    calculateHash(): string;
    getHashObject?(): object;
};

export type HashedInMemoryEntityConstructor = Constructor<HashedEntity>;

export function hashedEntityMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & HashedEntity {
    hashedSchemaMixin(item);

    // @ts-expect-error
    const properties: InMemoryEntity & Pick<HashedEntity, "calculateHash" | "getHashObject"> = {
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
