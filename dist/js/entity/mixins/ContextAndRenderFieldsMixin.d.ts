import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { InMemoryEntity } from "../in_memory";
export type Context = AnyObject;
export type ContextAndRenderFields = {
    context?: Context;
    updateContext(ctx: Context): void;
    getPersistentContext(): Context | undefined;
    updatePersistentContext(ctx: Context): void;
    getCombinedContext(): Context;
    render(ctx: Context): void;
};
type AbstractBase = {
    render(ctx: Context): void;
};
export declare function contextAndRenderFieldsMixin<T extends InMemoryEntity & AbstractBase>(item: T): asserts item is T & ContextAndRenderFields;
export {};
