"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInSetEntrySelector = exports.getInSetEntrySelectorBuilder = exports.getInSetEntrySelectorByIds = exports.getInSetEntryWithoutClsOnly = exports.getInSetEntrySelectorByIdsCls = void 0;
const utils_1 = require("../../utils");
const getInSetEntrySelectorBuilder = (config) => {
    return {
        inSet: {
            $elemMatch: config,
        },
    };
};
exports.getInSetEntrySelectorBuilder = getInSetEntrySelectorBuilder;
const getInSetEntrySelectorByIdsCls = (ids, cls = "Team") => {
    const newIds = (0, utils_1.safeMakeArray)(ids);
    const config = {
        _id: { $in: newIds },
        ...(cls ? { cls } : {}),
    };
    return getInSetEntrySelectorBuilder(config);
};
exports.getInSetEntrySelectorByIdsCls = getInSetEntrySelectorByIdsCls;
const getInSetEntrySelectorByIds = (ids) => getInSetEntrySelectorByIdsCls(ids, null);
exports.getInSetEntrySelectorByIds = getInSetEntrySelectorByIds;
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
exports.getInSetEntrySelector = getInSetEntrySelector;
const getInSetEntryWithoutClsOnly = {
    inSet: { $not: { $elemMatch: { cls: { $exists: false } } } },
};
exports.getInSetEntryWithoutClsOnly = getInSetEntryWithoutClsOnly;
