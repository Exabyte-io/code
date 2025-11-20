/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    type DefaultableSchemaMixin,
    defaultableSchemaMixin,
} from "../../generated/DefaultableSchemaMixin";
import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

function defaultableEntityStaticMixin(Item: Constructor<InMemoryEntity>) {
    // @ts-expect-error
    const staticProperties: DefaultableInMemoryStaticEntity &
        Constructor<InMemoryEntity> &
        Constructor<DefaultableSchemaMixin> & {
            defaultConfig?: object | null;
        } = {
        createDefault() {
            return new this(this.defaultConfig);
        },
    };

    Object.defineProperties(Item, Object.getOwnPropertyDescriptors(staticProperties));

    return staticProperties;
}

export type DefaultableInMemoryEntity = DefaultableSchemaMixin;

export type DefaultableInMemoryStaticEntity = {
    createDefault: () => InMemoryEntity & DefaultableSchemaMixin;
};

export type DefaultableInMemoryEntityConstructor = Constructor<DefaultableSchemaMixin> &
    DefaultableInMemoryStaticEntity;

export function defaultableEntityMixin(Item: Constructor<InMemoryEntity>) {
    defaultableSchemaMixin(Item.prototype);
    defaultableEntityStaticMixin(Item);
}
