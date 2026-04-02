import { InMemoryEntity } from "./in_memory";
declare const InMemoryEntitySet_base: typeof InMemoryEntity & import("./set/InMemoryEntitySetBaseMixin").InMemoryEntitySetBaseConstructor & import("./set/InMemoryEntitySetMixin").InMemoryEntitySetConstructor;
export declare class InMemoryEntitySet extends InMemoryEntitySet_base {
}
export {};
