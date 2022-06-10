import { compareEntitiesInOrderedSetForSorting } from "../entity/set/ordered/utils";
import { safeMakeArray, convertToCompactCSVArrayOfObjects } from "./array";
import { extendClass, extendClassStaticProps, cloneClass } from "./class";
import { deepClone } from "./clone";
import { refreshCodeMirror } from "./codemirror";
import { getProgrammingLanguageFromFileExtension, formatFileSize } from "./file";
import { calculateHashFromObject, calculateHashFromString, removeTimestampableKeysFromConfig } from "./hash";
import {
    getOneMatchFromObject,
    safeMakeObject,
    convertKeysToCamelCaseForObject,
    flattenObject,
    renameKeysForObject,
    sortKeysDeepForObject,
    stringifyObject,
} from "./object";
import { getUUID } from "./uuid";
import {
    removeNewLinesAndExtraSpaces,
    randomAlphanumeric,
    removeEmptyLinesFromString,
    removeCommentsFromSourceCode,
    toFixedLocale,
} from "./str";

import { getSearchQuerySelector } from "./selector";

export {
    compareEntitiesInOrderedSetForSorting,

    safeMakeArray,
    convertToCompactCSVArrayOfObjects,

    cloneClass,
    extendClass,
    extendClassStaticProps,

    deepClone,

    refreshCodeMirror,

    getOneMatchFromObject,
    safeMakeObject,
    convertKeysToCamelCaseForObject,
    flattenObject,
    renameKeysForObject,
    sortKeysDeepForObject,
    stringifyObject,

    getProgrammingLanguageFromFileExtension,
    formatFileSize,

    calculateHashFromObject,
    calculateHashFromString,
    removeTimestampableKeysFromConfig,

    removeNewLinesAndExtraSpaces,
    randomAlphanumeric,
    removeEmptyLinesFromString,
    removeCommentsFromSourceCode,
    toFixedLocale,

    getUUID,

    getSearchQuerySelector,
};
