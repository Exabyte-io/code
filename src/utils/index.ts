import { compareEntitiesInOrderedSetForSorting } from "../entity/set/ordered/utils";
import { convertToCompactCSVArrayOfObjects, safeMakeArray } from "./array";
import { cloneClass, extendClass, extendClassStaticProps, extendThis } from "./class";
import { deepClone } from "./clone";
import { refreshCodeMirror } from "./codemirror";
import {
    createObjectPathFromFilePath,
    formatFileSize,
    getDirectories,
    getFilesInDirectory,
    getProgrammingLanguageFromFileExtension,
} from "./file";
import { filterEntityList } from "./filter";
import { fetchFilesFromGitHubAPI } from "./github";
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
import { buildNamedEntitySchema, getSchemaWithDependencies } from "./schemas";
import { getSearchQuerySelector } from "./selector";
import {
    convertArabicToRoman,
    findPreviousVersion,
    randomAlphanumeric,
    removeCommentsFromSourceCode,
    removeEmptyLinesFromString,
    removeNewLinesAndExtraSpaces,
    renderTextWithSubstitutes,
    toFixedLocale,
} from "./str";
import { mapTree } from "./tree";
import { containsEncodedComponents } from "./url";
import { getUUID } from "./uuid";
import { JsYamlAllSchemas, JsYamlTypes } from "./yaml";

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
    JsYamlTypes,
    JsYamlAllSchemas,
    renderTextWithSubstitutes,
    filterEntityList,
    getFilesInDirectory,
    getDirectories,
    createObjectPathFromFilePath,
    buildNamedEntitySchema,
    findPreviousVersion,
    fetchFilesFromGitHubAPI,
};
