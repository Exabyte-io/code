import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
type ClassBase = Constructor<InMemoryEntity> & {
    defaultConfig?: object | null;
};
export declare function defaultableMixinProps<T extends InMemoryEntity>(item: T): {
    isDefault: boolean;
};
declare const staticProperties: {
    createDefault<T extends ClassBase>(this: T): InstanceType<T> & DefaultableProps;
};
export declare function defaultableMixinStaticProps<T extends ClassBase>(Item: T): {
    createDefault<T_1 extends ClassBase>(this: T_1): InstanceType<T_1> & DefaultableProps;
};
type DefaultableProps = ReturnType<typeof defaultableMixinProps>;
export type DefaultableConstructor = Constructor<DefaultableProps> & typeof staticProperties;
export default function DefaultableMixin<S extends ClassBase>(superclass: S): S & DefaultableConstructor;
export {};
