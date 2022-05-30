export const DefaultableMixin = (superclass) => class extends superclass {

    get isDefault() {
        return this.prop('isDefault', false);
    }

    // Define in superclass
    // static get defaultConfig() {
    // }

    static createDefault() {
        return new this.prototype.constructor(this.defaultConfig);
    }

};

export const TaggableMixin = (superclass) => class extends superclass {

    get tags() {return this.prop('tags', [])}

    set tags(array) {this.setProp('tags', array)}

    // only keep unique elements in tags
    setTags(array) {this.tags = array.filter((value, index, self) => self.indexOf(value) === index)}

};

export const HasMetadataMixin = (superclass) => class extends superclass {

    get metadata() {return this.prop('metadata', {})}

    set metadata(object) {this.setProp('metadata', object)}

    updateMetadata(object) {this.metadata = Object.assign({}, this.metadata, object)}

};

export const HasDescriptionMixin = (superclass) => class extends superclass {

    get description() {return this.prop('description', '')}

    set description(string) {this.setProp('description', string)}

    get descriptionObject() {return this.prop('descriptionObject')}

    set descriptionObject(obj) {this.setProp('descriptionObject', obj)}

};

export const NamedEntityMixin = (superclass) => class extends superclass {

    get name() {
        return this.prop('name', '');
    }

    set name(name) {
        this.setProp('name', name);
    }

    // to be used when getter is overriden
    setName(name) {
        this.setProp('name', name);
    }

}


export const InMemoryEntitySetMixin = (superclass) => class extends superclass {

    containsEntity(entity) {return entity.inSet.some(ref => ref._id === this.id)}

};

export const InMemoryEntityInSetMixin = (superclass) => class extends superclass {

    get inSet() {return this.prop('inSet', [])}

    set inSet(inSet) {this.setProp('inSet', inSet)}

    getInSetFilteredByCls(cls) {return this.inSet.filter(ref => ref.cls === cls)}

    // finds a parent entity set of the same cls (hence `cls` field is absent)
    // NOTE: assumes that only one entry of this kind is present => gets the first one
    get parentEntitySetReference() {return this.inSet.find(item => item._id && !item.cls)}

};
