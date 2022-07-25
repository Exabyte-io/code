import { safeMakeArray } from "../../utils";

const getInSetEntrySelectorBuilder = (config) => {
    return {
        inSet: {
            $elemMatch: config,
        },
    };
};

const getInSetEntrySelectorByIdsCls = (ids, cls = "Team") => {
    const newIds = safeMakeArray(ids);
    const config = {
        _id: { $in: newIds },
        ...(cls ? { cls } : {}),
    };
    return getInSetEntrySelectorBuilder(config);
};

const getInSetEntrySelectorByIds = (ids) => getInSetEntrySelectorByIdsCls(ids, null);

const getInSetEntrySelector = (cls, _id) => {
    return {
        inSet: {
            $elemMatch: {
                ...(cls ? { cls } : {}),
                ...(_id ? { _id } : {}),
            },
        },
    };
};

const getInSetEntryWithoutClsOnly = {
    inSet: { $not: { $elemMatch: { cls: { $exists: false } } } },
};

export {
    getInSetEntrySelectorByIdsCls,
    getInSetEntryWithoutClsOnly,
    getInSetEntrySelectorByIds,
    getInSetEntrySelectorBuilder,
    getInSetEntrySelector,
};
