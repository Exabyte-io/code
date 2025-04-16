/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DefaultableEntitySchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";

function props<T extends InMemoryEntity>(item: T) {
    return Object.assign(item, {
        get isDefault() {
            return item.prop("isDefault", false);
        },
        set isDefault(isDefault: boolean) {
            item.setProp("isDefault", isDefault);
        },
    } satisfies DefaultableEntitySchema);
}

function staticProps<T extends InMemoryEntityConstructor>(item: T) {
    const properties = {
        get defaultConfig(): object | null {
            return null;
        },
        createDefault(): T {
            // @ts-ignore
            return new this.prototype.constructor(this.defaultConfig);
        },
    };
    return Object.assign(item, properties);
}

export default function DefaultableMixin<S extends InMemoryEntityConstructor>(superclass: S) {
    type Props = Constructor<ReturnType<typeof props<InstanceType<S>>>>;
    type StaticProps = Constructor<ReturnType<typeof staticProps<S>>>;

    class DefaultableMixin extends superclass {
        constructor(...args: any[]) {
            super(...args);
            props(this);
        }
    }

    staticProps(DefaultableMixin);

    return DefaultableMixin as S & Props & StaticProps;
}
