/* eslint-disable max-classes-per-file */
import { ENTITY_SET_TYPES } from "../enums";

// NOTE: these mixins are meant to be used together with `InMemoryEntity{In}SetMixin`s only

export const OrderedInMemoryEntitySetMixin = (superclass) => class extends superclass {
    get isOrderedSet() {
        return this.entitySetType === ENTITY_SET_TYPES.ordered;
    }
};

export const OrderedInMemoryEntityInSetMixin = (superclass) => class extends superclass {
    getIndexByIdInOrderedSet(setId) {
        const setData = this.inSet.find((s) => s._id === setId);
        return setData ? setData.index : 0;
    }
};
