"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamedEntityMixin = exports.DefaultableMixin = void 0;
exports.TaggableMixin = TaggableMixin;
exports.HasScopeTrackMixin = HasScopeTrackMixin;
exports.HasMetadataMixin = HasMetadataMixin;
exports.HasDescriptionMixin = HasDescriptionMixin;
exports.HasConsistencyChecksMixin = HasConsistencyChecksMixin;
const DefaultableMixin_1 = __importDefault(require("./DefaultableMixin"));
exports.DefaultableMixin = DefaultableMixin_1.default;
const NamedEntityMixin_1 = __importDefault(require("./NamedEntityMixin"));
exports.NamedEntityMixin = NamedEntityMixin_1.default;
function TaggableMixin(superclass) {
    return class extends superclass {
        get tags() {
            return this.prop("tags", []);
        }
        set tags(array) {
            this.setProp("tags", array);
        }
        // only keep unique elements in tags
        setTags(array) {
            this.tags = array.filter((value, index, self) => self.indexOf(value) === index);
        }
    };
}
function HasScopeTrackMixin(superclass) {
    return class extends superclass {
        get scopeTrack() {
            return this.prop("scopeTrack", []);
        }
        set scopeTrack(array) {
            this.setProp("scopeTrack", array);
        }
    };
}
function HasMetadataMixin(superclass) {
    return class extends superclass {
        get metadata() {
            return this.prop("metadata", {});
        }
        set metadata(object) {
            this.setProp("metadata", object);
        }
        updateMetadata(object) {
            this.metadata = { ...this.metadata, ...object };
        }
    };
}
function HasDescriptionMixin(superclass) {
    return class extends superclass {
        get description() {
            return this.prop("description", "");
        }
        set description(string) {
            this.setProp("description", string);
        }
        get descriptionObject() {
            return this.prop("descriptionObject");
        }
        set descriptionObject(obj) {
            this.setProp("descriptionObject", obj);
        }
    };
}
function HasConsistencyChecksMixin(superclass) {
    return class HasConsistencyChecksMixin extends superclass {
        get consistencyChecks() {
            return this.prop("consistencyChecks", []);
        }
        set consistencyChecks(array) {
            this.setProp("consistencyChecks", array);
        }
        addConsistencyChecks(array) {
            this.consistencyChecks = [...this.consistencyChecks, ...array];
        }
    };
}
