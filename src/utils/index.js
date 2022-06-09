import { deepClone } from "./clone";
import { getOneMatchFromObject, safeMakeObject } from "./object";
import { getUUID } from "./uuid";
import { safeMakeArray } from "./array";
import { getProgrammingLanguageFromFileExtension } from "./file";
import { removeNewLinesAndExtraSpaces } from "./str";
import { compareEntitiesInOrderedSetForSorting } from "../entity/set/ordered/utils";

export {
    safeMakeArray,

    deepClone,

    getOneMatchFromObject,
    safeMakeObject,

    getProgrammingLanguageFromFileExtension,
    compareEntitiesInOrderedSetForSorting,

    removeNewLinesAndExtraSpaces,

    getUUID,
}
