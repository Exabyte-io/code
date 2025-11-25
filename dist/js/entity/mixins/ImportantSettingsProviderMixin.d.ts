import type { InMemoryEntity } from "../in_memory";
export interface ContextProvider {
    domain?: string;
}
export type ImportantSettingsProvider = {
    important: object;
    setImportant(key: string, value: unknown): void;
    importantSettingsProviders: ContextProvider[];
    isImportantEdited: boolean | undefined;
};
type AbstractBase = {
    contextProviders: ContextProvider[];
};
export declare function importantSettingsProviderMixin<T extends InMemoryEntity & AbstractBase>(item: T): asserts item is T & ImportantSettingsProvider;
export {};
