import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

export function namedEntityMixin<T extends InMemoryEntity>(item: T) {
    // @ts-expect-error
    const properties: InMemoryEntity & NamedInMemoryEntity = {
        get name(): string {
            return this.prop("name", "");
        },
        set name(name: string) {
            this.setProp("name", name);
        },
        setName(name: string) {
            this.setProp("name", name);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export type NamedInMemoryEntity = {
    name: string;
    setName: (name: string) => void;
};

export type NamedInMemoryEntityConstructor = Constructor<NamedInMemoryEntity>;
