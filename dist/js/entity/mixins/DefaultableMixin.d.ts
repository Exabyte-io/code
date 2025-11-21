import { type DefaultableSchemaMixin } from "../../generated/DefaultableSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
export type Defaultable = DefaultableSchemaMixin;
export type DefaultableInMemoryEntity = Defaultable;
export type DefaultableInMemoryStaticEntity = {
    createDefault: () => InMemoryEntity & Defaultable;
};
export type DefaultableInMemoryEntityConstructor = Constructor<Defaultable> & DefaultableInMemoryStaticEntity;
export declare function defaultableEntityMixin(Item: Constructor<InMemoryEntity>): void;
