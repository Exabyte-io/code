import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
type ClassBase = Constructor<InMemoryEntity> & {
    defaultConfig?: object | null;
};
export declare function defaultableMixinProps<T extends InMemoryEntity>(item: T): {
    isDefault: boolean;
};
declare const staticProperties: {
    createDefault<T extends ClassBase>(this: T): InstanceType<T> & DefaultableInMemoryEntity;
};
export declare function defaultableMixinStaticProps<T extends ClassBase>(Item: T): {
    createDefault<T_1 extends ClassBase>(this: T_1): InstanceType<T_1> & DefaultableInMemoryEntity;
};
export type DefaultableInMemoryEntity = ReturnType<typeof defaultableMixinProps>;
export type DefaultableInMemoryEntityConstructor = Constructor<DefaultableInMemoryEntity>;
export type DefaultableConstructor = DefaultableInMemoryEntityConstructor & typeof staticProperties;
export default function DefaultableMixin<S extends ClassBase>(superclass: S): S & DefaultableConstructor;
export {};
