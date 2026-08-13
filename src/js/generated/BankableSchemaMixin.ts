import type { BankableSchema, BaseInMemoryEntitySchema } from "@mat3ra/esse/dist/js/types";

import type { InMemoryEntity } from "../entity/in_memory";

export type BankableSchemaMixin = BankableSchema;

export type BankableInMemoryEntity = InMemoryEntity<BaseInMemoryEntitySchema & BankableSchemaMixin>;

export function bankableSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & BankableSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<BankableSchemaMixin> & BankableSchemaMixin = {
        get exabyteId() {
            return this.requiredProp("exabyteId");
        },
        set exabyteId(value: BankableSchema["exabyteId"]) {
            this.setProp("exabyteId", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
