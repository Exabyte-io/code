import { InMemoryEntity } from "../in_memory";

type ScopeTrackDescriptor = {
    get scopeTrack(): unknown[];
    set scopeTrack(array: unknown[]);
};

function schemaMixin(item: InMemoryEntity) {
    // @ts-expect-error
    const properties: InMemoryEntity & ScopeTrackDescriptor = {
        get scopeTrack(): unknown[] {
            return this.prop("scopeTrack", []);
        },
        set scopeTrack(array: unknown[]) {
            this.setProp("scopeTrack", array);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export function hasScopeTrackMixin(item: InMemoryEntity) {
    return schemaMixin(item);
}

export type HasScopeTrackInMemoryEntity = ReturnType<typeof hasScopeTrackMixin>;
