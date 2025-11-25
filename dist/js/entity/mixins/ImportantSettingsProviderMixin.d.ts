import type { InMemoryEntity } from "../in_memory";
export interface ContextProvider {
    domain: string;
}
type ImportantSettingsProvider = {
    contextProviders: ContextProvider[];
    important: object;
    setImportant(key: string, value: unknown): void;
    importantSettingsProviders: ContextProvider[];
    isImportantEdited: boolean | undefined;
};
export declare function importantSettingsProviderMixin<T extends InMemoryEntity>(item: T): asserts item is T & ImportantSettingsProvider;
export {};
