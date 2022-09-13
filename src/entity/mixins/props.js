/* eslint-disable max-classes-per-file */
export const DefaultableMixin = (superclass) => {
    return class extends superclass {
        get isDefault() {
            return this.prop("isDefault", false);
        }

        // Define in superclass
        // static get defaultConfig() {
        // }

        static createDefault() {
            return new this.prototype.constructor(this.defaultConfig);
        }
    };
};

export const TaggableMixin = (superclass) => {
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
};

export const HasMetadataMixin = (superclass) => {
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
};

export const HasDescriptionMixin = (superclass) => {
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
};

export const NamedEntityMixin = (superclass) => {
    return class extends superclass {
        // eslint-disable-next-line class-methods-use-this
        get alternativeName() {
            throw new Error("Alternative name not defined");
        }

        get name() {
            return this.prop("name") || this.alternativeName || "";
        }

        set name(name) {
            this.setProp("name", name);
        }

        // to be used when getter is overriden
        setName(name) {
            this.setProp("name", name);
        }
    };
};
