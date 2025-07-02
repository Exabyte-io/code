import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
export declare function namedEntityMixin<T extends InMemoryEntity>(item: T): InMemoryEntity & NamedInMemoryEntity;
export type NamedInMemoryEntity = {
    name: string;
    setName: (name: string) => void;
};
export type NamedInMemoryEntityConstructor = Constructor<NamedInMemoryEntity>;
