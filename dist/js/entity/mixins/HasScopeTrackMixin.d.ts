import { InMemoryEntity } from "../in_memory";
type ScopeTrackSchema = {
    scopeTrack?: unknown[];
};
type ScopeTrackDescriptor = {
    get scopeTrack(): unknown[];
    set scopeTrack(array: unknown[]);
};
export declare function hasScopeTrackMixin(item: InMemoryEntity): InMemoryEntity<ScopeTrackSchema> & ScopeTrackDescriptor;
export type HasScopeTrackInMemoryEntity = ReturnType<typeof hasScopeTrackMixin>;
export {};
