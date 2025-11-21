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

export type NamedInMemoryEntity = NamedEntity;

export type NamedInMemoryEntityConstructor = Constructor<NamedInMemoryEntity>;

export function namedEntityMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & NamedEntityProperties {
    namedEntitySchemaMixin(item);

    // @ts-expect-error
    const properties: InMemoryEntity & NamedEntitySchemaMixin & NamedEntityProperties = {
        setName(name: string) {
            this.setProp("name", name);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
