"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasScopeTrackMixin = hasScopeTrackMixin;
exports.default = HasScopeTrackMixin;
function schemaMixin(item) {
    const schema = {
        get scopeTrack() {
            return item.prop("scopeTrack", []);
        },
        set scopeTrack(array) {
            item.setProp("scopeTrack", array);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(schema));
    return schema;
}
function hasScopeTrackMixin(item) {
    return schemaMixin(item);
}
function HasScopeTrackMixin(superclass) {
    class HasScopeTrackMixin extends superclass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args) {
            super(...args);
            hasScopeTrackMixin(this);
        }
    }
    return HasScopeTrackMixin;
}
