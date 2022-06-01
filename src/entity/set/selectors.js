import { safeMakeArray } from "../../utils";

const getInSetEntrySelectorBuilder = function (config) {
    return {
        inSet: {
            $elemMatch: config
        }
    }
};

const getInSetEntrySelectorByIdsCls = function (ids, cls = 'Team') {
    ids = safeMakeArray(ids);
    const config = {
        _id: {$in: ids},
        ...cls ? {cls} : {},
    };
    return getInSetEntrySelectorBuilder(config);
};

const getInSetEntrySelectorByIds = (ids) => getInSetEntrySelectorByIdsCls(ids, null);

const getInSetEntrySelector = function (cls, _id) {
    return {
        inSet: {
            $elemMatch: {
                ...cls ? {cls} : {},
                ..._id ? {_id} : {},
            }
        }
    }
};

const getInSetEntryWithoutClsOnly = {inSet: {$not: {$elemMatch: {cls: {$exists: false}}}}};

export {
    getInSetEntrySelectorByIdsCls,
    getInSetEntryWithoutClsOnly,
    getInSetEntrySelectorByIds,
    getInSetEntrySelectorBuilder,
    getInSetEntrySelector,
}
