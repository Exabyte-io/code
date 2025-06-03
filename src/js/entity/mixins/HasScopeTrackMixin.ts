import type { Constructor } from "../../utils/types";
import { InMemoryEntity, InMemoryEntityConstructor } from "../in_memory";

function schemaMixin(item: InMemoryEntity) {
    const schema = {
        get scopeTrack(): unknown[] {
            return item.prop("scopeTrack", []);
        },
        set scopeTrack(array: unknown[]) {
            item.setProp("scopeTrack", array);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));

    return schema;
}

export function hasScopeTrackMixin(item: InMemoryEntity) {
    return schemaMixin(item);
}

export type HasScopeTrackInMemoryEntity = ReturnType<typeof hasScopeTrackMixin>;
export type HasScopeTrackInMemoryEntityConstructor = Constructor<HasScopeTrackInMemoryEntity>;

export default function HasScopeTrackMixin<S extends InMemoryEntityConstructor>(superclass: S) {
    class HasScopeTrackMixin extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);
            hasScopeTrackMixin(this);
        }
    }

    return HasScopeTrackMixin as S & HasScopeTrackInMemoryEntityConstructor;
}
