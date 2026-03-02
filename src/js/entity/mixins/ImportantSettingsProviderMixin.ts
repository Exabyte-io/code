import { deepClone } from "../../utils/clone";
import type { Constructor } from "../../utils/types";
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

export type ImportantSettingsProviderInMemoryEntityConstructor =
    Constructor<ImportantSettingsProvider>;

export function importantSettingsProviderMixin<T extends InMemoryEntity & AbstractBase>(
    item: T,
): asserts item is T & ImportantSettingsProvider {
    // @ts-expect-error
    const properties: InMemoryEntity & AbstractBase & ImportantSettingsProvider = {
        get important() {
            return deepClone(this._json.important || {});
        },

        setImportant(key: string, value: unknown) {
            this.setProp("important", { [key]: value });
        },

        get importantSettingsProviders() {
            return this.contextProviders.filter((p) => p.domain === "important");
        },

        get isImportantEdited() {
            return this.prop<boolean>("important.isEdited");
        },

        set isImportantEdited(bool) {
            this.setProp("important", Object.assign(this.important, { isEdited: bool }));
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
