import { type DefaultableSchemaMixin } from "../../generated/DefaultableSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
export type DefaultableInMemoryEntity = DefaultableSchemaMixin;
export type DefaultableInMemoryStaticEntity = {
    createDefault: () => InMemoryEntity & DefaultableSchemaMixin;
};
export type DefaultableInMemoryEntityConstructor = Constructor<DefaultableSchemaMixin> & DefaultableInMemoryStaticEntity;
export declare function defaultableEntityMixin(Item: Constructor<InMemoryEntity>): void;
