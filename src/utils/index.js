import { compareEntitiesInOrderedSetForSorting } from "../entity/set/ordered/utils";
import { safeMakeArray, convertToCompactCSVArrayOfObjects } from "./array";
import { extendClass, extendClassStaticProps, cloneClass } from "./class";
import { deepClone } from "./clone";
import { refreshCodeMirror } from "./codemirror";
import { getProgrammingLanguageFromFileExtension } from "./file";
import { getOneMatchFromObject, safeMakeObject } from "./object";
import { getUUID } from "./uuid";
import { removeNewLinesAndExtraSpaces } from "./str";

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

    getProgrammingLanguageFromFileExtension,

    removeNewLinesAndExtraSpaces,

    getUUID,
}
