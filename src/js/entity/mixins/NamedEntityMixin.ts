import {
    type NamedEntitySchemaMixin,
    namedEntitySchemaMixin,
} from "../../generated/NamedEntitySchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

type NamedEntityProperties = {
    setName: (name: string) => void;
};

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

export type NamedInMemoryEntity = NamedEntitySchemaMixin & NamedEntityProperties;

export type NamedInMemoryEntityConstructor = Constructor<NamedInMemoryEntity>;
