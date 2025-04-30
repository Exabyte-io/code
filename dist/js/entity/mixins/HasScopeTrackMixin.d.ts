import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";
export declare function hasScopeTrackMixin(item: InMemoryEntity): {
    scopeTrack: unknown[];
};
export type HasScopeTrackInMemoryEntity = ReturnType<typeof hasScopeTrackMixin>;
export type HasScopeTrackInMemoryEntityConstructor = Constructor<HasScopeTrackInMemoryEntity>;
export default function HasScopeTrackMixin<S extends InMemoryEntityConstructor>(superclass: S): S & HasScopeTrackInMemoryEntityConstructor;
