import {
    type HasDescriptionSchemaMixin,
    hasDescriptionSchemaMixin,
} from "../../generated/HasDescriptionSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

export function hasDescriptionMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & HasDescriptionSchemaMixin {
    hasDescriptionSchemaMixin(item);
}

export type HasDescriptionInMemoryEntity = HasDescriptionSchemaMixin;

export type HasDescriptionInMemoryEntityConstructor = Constructor<HasDescriptionInMemoryEntity>;
