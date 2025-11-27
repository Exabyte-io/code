import {
    type NamedEntitySchemaMixin,
    namedEntitySchemaMixin,
} from "../../generated/NamedEntitySchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

type NamedEntityProperties = {
    setName: (name: string) => void;
};

export type NamedEntity = NamedEntitySchemaMixin & NamedEntityProperties;

export type NamedInMemoryEntityConstructor = Constructor<NamedEntity>;

function namedEntityPropertiesMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & NamedEntity {
    // @ts-expect-error
    const properties: InMemoryEntity & NamedEntity = {
        setName(name: string) {
            this.setProp("name", name);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export function namedEntityMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & NamedEntity {
    namedEntitySchemaMixin(item);
    namedEntityPropertiesMixin(item);
}
