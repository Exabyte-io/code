import { calculateHashFromObject } from "../../utils/hash";
import { removeCommentsFromSourceCode, removeEmptyLinesFromString } from "../../utils/str";

export const HashedEntityMixin = (superclass) => {
    return class extends superclass {
        /*
         * @summary Returns an object based on meaningful fields for this unit, that will be used to calculate the hash
         *          Must be overridden.
         */
        getHashObject() {
            return {};
        }

        /**
         * @summary Calculates hash based on meaningful fields and unit-specific fields. Unit-specific fields are
         *          separated into _typeSpecificHash function which can be overwritten by child classes.
         *          head and next are also important but not considered since they are included in subworkflow hash.
         */
        calculateHash() {
            return calculateHashFromObject(this.getHashObject());
        }
    };
};

export const HashedInputArrayMixin = (superclass) => {
    return class extends superclass {
        /*
         * @summary expects an array with elements containing field [{content: "..."}]
         */
        get hashFromArrayInputContent() {
            const objectForHashing = this.input.map(i =>
                removeEmptyLinesFromString(removeCommentsFromSourceCode(i.content))
            );
            return calculateHashFromObject(objectForHashing)
        }
    };
};
