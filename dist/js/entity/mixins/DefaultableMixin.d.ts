import { type DefaultableSchemaMixin } from "../../generated/DefaultableSchemaMixin";
import type { AbstractConstructor, Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
export type Defaultable = DefaultableSchemaMixin;
export type DefaultableInMemoryStaticEntity = {
    createDefault: () => InMemoryEntity & Defaultable;
};
export type DefaultableInMemoryEntityConstructor = Constructor<Defaultable> & DefaultableInMemoryStaticEntity;
export declare function defaultableEntityMixin(Item: AbstractConstructor<InMemoryEntity>): void;
