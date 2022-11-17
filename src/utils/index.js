import { compareEntitiesInOrderedSetForSorting } from "../entity/set/ordered/utils";
import { convertToCompactCSVArrayOfObjects, safeMakeArray } from "./array";
import { cloneClass, extendClass, extendClassStaticProps, extendThis } from "./class";
import { deepClone } from "./clone";
import { refreshCodeMirror } from "./codemirror";
import { formatFileSize, getProgrammingLanguageFromFileExtension } from "./file";
import {
    calculateHashFromObject,
    calculateHashFromString,
    removeTimestampableKeysFromConfig,
} from "./hash";
import {
    convertKeysToCamelCaseForObject,
    flattenObject,
    getOneMatchFromObject,
    renameKeysForObject,
    safeMakeObject,
    sortKeysDeepForObject,
    stringifyObject,
} from "./object";
import { getSearchQuerySelector } from "./selector";
import {
    convertArabicToRoman,
    randomAlphanumeric,
    removeCommentsFromSourceCode,
    removeEmptyLinesFromString,
    removeNewLinesAndExtraSpaces,
    toFixedLocale,
} from "./str";
import { containsEncodedComponents } from "./url";
import { getUUID } from "./uuid";

export {
    compareEntitiesInOrderedSetForSorting,
    safeMakeArray,
    convertToCompactCSVArrayOfObjects,
    cloneClass,
    extendThis,
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
    containsEncodedComponents,
    convertArabicToRoman,
};
