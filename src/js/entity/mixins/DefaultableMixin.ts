/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DefaultableEntitySchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

type ClassBase = Constructor<InMemoryEntity> & {
    defaultConfig?: object | null;
};

export function defaultableMixinProps<T extends InMemoryEntity>(item: T) {
    const properties = {
        get isDefault() {
            return item.prop("isDefault", false);
        },
        set isDefault(isDefault: boolean) {
            item.setProp("isDefault", isDefault);
        },
    } satisfies DefaultableEntitySchema;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

const staticProperties = {
    createDefault<T extends ClassBase>(this: T) {
        return new this(this.defaultConfig) as InstanceType<T> & DefaultableProps;
    },
};

export function defaultableMixinStaticProps<T extends ClassBase>(Item: T) {
    Object.defineProperties(Item, Object.getOwnPropertyDescriptors(staticProperties));

    return staticProperties;
}

type DefaultableProps = ReturnType<typeof defaultableMixinProps>;

export type DefaultableConstructor = Constructor<DefaultableProps> & typeof staticProperties;

export default function DefaultableMixin<S extends ClassBase>(superclass: S) {
    class DefaultableMixin extends superclass {
        constructor(...args: any[]) {
            super(...args);
            defaultableMixinProps(this);
        }
    }

    defaultableMixinStaticProps(DefaultableMixin);

    return DefaultableMixin as S & DefaultableConstructor;
}
