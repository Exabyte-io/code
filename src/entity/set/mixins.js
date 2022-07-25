/* eslint-disable max-classes-per-file */
export const InMemoryEntitySetMixin = (superclass) =>
    class extends superclass {
        containsEntity(entity) {
            return entity.inSet.some((ref) => ref._id === this.id);
        }
    };

export const InMemoryEntityInSetMixin = (superclass) =>
    class extends superclass {
        get inSet() {
            return this.prop("inSet", []);
        }

        set inSet(inSet) {
            this.setProp("inSet", inSet);
        }

        getInSetFilteredByCls(cls) {
            return this.inSet.filter((ref) => ref.cls === cls);
        }

        // finds a parent entity set of the same cls (hence `cls` field is absent)
        // NOTE: assumes that only one entry of this kind is present => gets the first one
        get parentEntitySetReference() {
            return this.inSet.find((item) => item._id && !item.cls);
        }
    };
