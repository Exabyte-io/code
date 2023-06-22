import lodash from "lodash";

/**
 * Check if one path matches regular expression or exact string.
 * @param {{path: string}} pathObject - Entity or object with path property
 * @param {Array<{path: string}|{regex: RegExp}>} filterObjects - Filter conditions
 * @return {boolean}
 */
function isPathSupported(pathObject, filterObjects) {
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
function isMultiPathSupported(pathObject, multiPathSeparator, filterObjects) {
    const expandedPaths = pathObject.path.split(multiPathSeparator).map((p) => ({ path: p }));
    return expandedPaths.every((expandedPath) => isPathSupported(expandedPath, filterObjects));
}

/**
 * Filter list of entity paths or entities by paths and regular expressions.
 * @param {Object[]} entitiesOrPaths - Array of objects defining entity path
 * @param {Array<{ path: string }|{ regex: string }|{ regex: RegExp }>} filterObjects - Array of path or regular expression objects
 * @param {string} multiPathSeparator - string by which paths should be split
 * @return {Object[]} - filtered entity path objects or entities
 */
export function filterEntityList({ entitiesOrPaths, filterObjects = [], multiPathSeparator = "" }) {
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

    return lodash.uniqBy(filtered, "path");
}
