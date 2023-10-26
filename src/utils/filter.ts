import uniqBy from "lodash/uniqBy";

// Entity or object with path property
interface PathObject {
    path: string;
}

// Filter conditions
export interface FilterObject {
    path?: string;
    regex?: RegExp;
    isDefault?: boolean;
}

/**
 * Check if one path matches regular expression or exact string.
 */
function isPathSupported(pathObject: PathObject, filterObjects: FilterObject[]): boolean {
    return filterObjects.some((filterObj) => {
        if (filterObj.path) {
            return filterObj.path === pathObject.path;
        }
        if (filterObj.regex) {
            return filterObj.regex.test(pathObject.path);
        }
        return false;
    });
}

/**
 * Check if _all_ paths in concatenated path match filtering conditions.
 * @param {{path: string}} pathObject - Path object with concatenated path (multipath)
 * @param {string} multiPathSeparator - String sequence used for concatenation of paths
 * @param {Array<{path: string}|{regex: RegExp}>} filterObjects - Filter conditions
 * @return {boolean}
 */
function isMultiPathSupported(
    pathObject: PathObject,
    multiPathSeparator: string,
    filterObjects: FilterObject[],
) {
    const expandedPaths = pathObject.path.split(multiPathSeparator).map((p) => ({ path: p }));
    return expandedPaths.every((expandedPath) => isPathSupported(expandedPath, filterObjects));
}

function setDefaultAsFirst(
    pathObjects: PathObject[],
    filterObjects: FilterObject[],
): PathObject[] {
    const defaultFilter = filterObjects.find((f) => f.isDefault);
    if (!defaultFilter) return pathObjects;

    const defaultIndex = pathObjects.findIndex((pathObj) => {
        return isPathSupported(pathObj, [defaultFilter]);
    });
    if (defaultIndex < 0 || pathObjects.length < 2) return pathObjects;

    const tmp = pathObjects[1];
    pathObjects[0] = pathObjects[defaultIndex];
    pathObjects[1] = tmp;
    return pathObjects;
}

interface FilterEntityListProps {
    entitiesOrPaths: PathObject[]; // Array of objects defining entity path
    filterObjects?: FilterObject[]; // Array of path or regular expression objects
    multiPathSeparator?: string; // string by which paths should be split
}

/**
 * Filter list of entity paths or entities by paths and regular expressions.
 * @return - filtered entity path objects or entities
 */
export function filterEntityList({
    entitiesOrPaths,
    filterObjects = [],
    multiPathSeparator = "",
}: FilterEntityListProps): PathObject[] {
    if (!filterObjects || !filterObjects.length) return [];
    const filterObjects_ = filterObjects.map((o) => (o.regex ? { regex: new RegExp(o.regex) } : o));

    let filtered;
    if (multiPathSeparator) {
        filtered = entitiesOrPaths.filter((e) =>
            isMultiPathSupported(e, multiPathSeparator, filterObjects_),
        );
    } else {
        filtered = entitiesOrPaths.filter((e) => isPathSupported(e, filterObjects_));
    }

    filtered = setDefaultAsFirst(filtered, filterObjects_);

    return uniqBy(filtered, "path");
}
