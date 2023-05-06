import { compareEntitiesInOrderedSetForSorting } from "../entity/set/ordered/utils";
import { convertToCompactCSVArrayOfObjects, safeMakeArray } from "./array";
import { cloneClass, extendClass, extendClassStaticProps, extendThis } from "./class";
import { deepClone } from "./clone";
import { refreshCodeMirror } from "./codemirror";
import { formatFileSize, getProgrammingLanguageFromFileExtension } from "./file";
import { addUnit, removeUnit, replaceUnit, setNextLinks, setUnitsHead } from "./graph";
import {
    calculateHashFromObject,
    calculateHashFromString,
    removeTimestampableKeysFromConfig,
} from "./hash";
import {
    convertKeysToCamelCaseForObject,
    flattenObject,
    getOneMatchFromObject,
    mergeTerminalNodes,
    renameKeysForObject,
    safeMakeObject,
    sortKeysDeepForObject,
    stringifyObject,
} from "./object";
import { getSchemaWithDependencies } from "./schemas";
import { getSearchQuerySelector } from "./selector";
import {
    convertArabicToRoman,
    randomAlphanumeric,
    removeCommentsFromSourceCode,
    removeEmptyLinesFromString,
    removeNewLinesAndExtraSpaces,
    toFixedLocale,
} from "./str";
import { mapTree } from "./tree";
import { containsEncodedComponents } from "./url";
import { getUUID } from "./uuid";
import { allYAMLSchemas, combineType, esseType, parameterType } from "./yaml";

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
    setUnitsHead,
    setNextLinks,
    addUnit,
    removeUnit,
    replaceUnit,
    mapTree,
    getSchemaWithDependencies,
    mergeTerminalNodes,
    combineType,
    parameterType,
    allYAMLSchemas,
    esseType,
};
