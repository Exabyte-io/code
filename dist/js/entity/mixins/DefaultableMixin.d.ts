import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";
type ClassBase = Constructor<InMemoryEntity> & {
    defaultConfig?: object | null;
};
export declare function defaultableMixinProps<T extends InMemoryEntity>(item: T): {
    isDefault: boolean;
};
export declare function defaultableMixinStaticProps<T extends ClassBase>(item: T): {
    createDefault(): T;
};
type DefaultableProps = ReturnType<typeof defaultableMixinProps>;
type DefaultableStaticProps = ReturnType<typeof defaultableMixinStaticProps>;
export type DefaultableConstructor = Constructor<DefaultableProps> & Constructor<DefaultableStaticProps>;
export default function DefaultableMixin<S extends ClassBase>(superclass: S): S & DefaultableConstructor;
export {};
