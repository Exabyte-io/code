import { InMemoryEntity } from "../in_memory";
type ScopeTrackDescriptor = {
    get scopeTrack(): unknown[];
    set scopeTrack(array: unknown[]);
};
export declare function hasScopeTrackMixin(item: InMemoryEntity): InMemoryEntity & ScopeTrackDescriptor;
export type HasScopeTrackInMemoryEntity = ReturnType<typeof hasScopeTrackMixin>;
export {};
