"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasScopeTrackMixin = hasScopeTrackMixin;
function schemaMixin(item) {
    // @ts-expect-error
    const properties = {
        get scopeTrack() {
            return this.prop("scopeTrack", []);
        },
        set scopeTrack(array) {
            this.setProp("scopeTrack", array);
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
    return properties;
}
function hasScopeTrackMixin(item) {
    return schemaMixin(item);
}
