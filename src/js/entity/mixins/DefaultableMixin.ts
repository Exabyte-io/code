/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

export function defaultableEntityMixin<T extends InMemoryEntity>(item: T) {
    // @ts-expect-error
    const properties: InMemoryEntity & DefaultableInMemoryEntity = {
        get isDefault() {
            return this.prop("isDefault", false);
        },
        set isDefault(isDefault: boolean) {
            this.setProp("isDefault", isDefault);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export function defaultableEntityStaticMixin(Item: Constructor<InMemoryEntity>) {
    // @ts-expect-error
    const staticProperties: DefaultableInMemoryStaticEntity &
        Constructor<InMemoryEntity> &
        Constructor<DefaultableInMemoryEntity> & {
            defaultConfig?: object | null;
        } = {
        createDefault() {
            return new this(this.defaultConfig);
        },
    };

    Object.defineProperties(Item, Object.getOwnPropertyDescriptors(staticProperties));

    return staticProperties;
}

export type DefaultableInMemoryEntity = {
    isDefault: boolean;
};

export type DefaultableInMemoryStaticEntity = {
    createDefault: () => InMemoryEntity & DefaultableInMemoryEntity;
};

export type DefaultableInMemoryEntityConstructor = Constructor<DefaultableInMemoryEntity> &
    DefaultableInMemoryStaticEntity;
