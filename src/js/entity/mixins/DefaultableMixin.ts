/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DefaultableEntitySchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

type ClassBase = Constructor<InMemoryEntity> & {
    defaultConfig?: object | null;
};

function defaultableMixinProps<T extends InMemoryEntity>(item: T) {
    const props = {
        get isDefault() {
            return item.prop("isDefault", false);
        },
        set isDefault(isDefault: boolean) {
            item.setProp("isDefault", isDefault);
        },
    } satisfies DefaultableEntitySchema;

    Object.assign(item, props);

    return props;
}

function defaultableMixinStaticProps<T extends ClassBase>(item: T) {
    const properties = {
        createDefault(): T {
            // @ts-ignore
            return new item.prototype.constructor(item.defaultConfig);
        },
    };

    Object.assign(item, properties);

    return properties;
}

type DefaultableProps = ReturnType<typeof defaultableMixinProps>;
type DefaultableStaticProps = ReturnType<typeof defaultableMixinStaticProps>;

export type DefaultableConstructor = Constructor<DefaultableProps> &
    Constructor<DefaultableStaticProps>;

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
