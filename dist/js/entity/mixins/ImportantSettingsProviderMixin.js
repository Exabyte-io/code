"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importantSettingsProviderMixin = importantSettingsProviderMixin;
const clone_1 = require("../../utils/clone");
function importantSettingsProviderMixin(item) {
    // @ts-expect-error
    const properties = {
        get important() {
            return (0, clone_1.deepClone)(this._json.important || {});
        },
        setImportant(key, value) {
            this.setProp("important", { [key]: value });
        },
        get importantSettingsProviders() {
            return this.contextProviders.filter((p) => p.domain === "important");
        },
        get isImportantEdited() {
            return this.prop("important.isEdited");
        },
        set isImportantEdited(bool) {
            this.setProp("important", Object.assign(this.important, { isEdited: bool }));
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
