import { safeMakeArray } from "../../utils";

const getInSetEntrySelectorBuilder = (config: object) => {
    return {
        inSet: {
            $elemMatch: config,
        },
    };
};

const getInSetEntrySelectorByIdsCls = (ids: string[], cls: string | null = "Team") => {
    const newIds = safeMakeArray(ids);
    const config = {
        _id: { $in: newIds },
        ...(cls ? { cls } : {}),
    };
    return getInSetEntrySelectorBuilder(config);
};

const getInSetEntrySelectorByIds = (ids: string[]) => getInSetEntrySelectorByIdsCls(ids, null);

const getInSetEntrySelector = (cls?: string, _id?: string) => {
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
