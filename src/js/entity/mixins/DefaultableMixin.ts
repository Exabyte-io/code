/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    type DefaultableSchemaMixin,
    defaultableSchemaMixin,
} from "../../generated/DefaultableSchemaMixin";
import type { AbstractConstructor, Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

export type Defaultable = DefaultableSchemaMixin;

export type DefaultableInMemoryStaticEntity = {
    createDefault: () => InMemoryEntity & Defaultable;
};

export type DefaultableInMemoryEntityConstructor = Constructor<Defaultable> &
    DefaultableInMemoryStaticEntity;

function defaultableEntityStaticMixin(Item: AbstractConstructor<InMemoryEntity>) {
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

export function defaultableEntityMixin(Item: AbstractConstructor<InMemoryEntity>) {
    defaultableSchemaMixin(Item.prototype);
    defaultableEntityStaticMixin(Item);
}
