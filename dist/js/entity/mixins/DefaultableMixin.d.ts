import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
export declare function defaultableEntityMixin<T extends InMemoryEntity>(item: T): InMemoryEntity & DefaultableInMemoryEntity;
export declare function defaultableEntityStaticMixin(Item: Constructor<InMemoryEntity>): DefaultableInMemoryStaticEntity & Constructor<InMemoryEntity> & Constructor<DefaultableInMemoryEntity> & {
    defaultConfig?: object | null;
};
export type DefaultableInMemoryEntity = {
    isDefault: boolean;
};
export type DefaultableInMemoryStaticEntity = {
    createDefault: () => InMemoryEntity & DefaultableInMemoryEntity;
};
export type DefaultableInMemoryEntityConstructor = Constructor<DefaultableInMemoryEntity>;
export type DefaultableConstructor = DefaultableInMemoryEntityConstructor & DefaultableInMemoryStaticEntity;
