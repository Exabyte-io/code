import lodash from "lodash";

import { isContainedByProperty } from "./array";

/**
 * Filter list of entity paths or entities by paths and regular expressions.
 * @param {Object[]} entitiesOrPaths - Array of objects defining entity path
 * @param {Array<{ path: string }|{ regex: string }|{ regex: RegExp }>} filterObjects - Array of path or regular expression objects
 * @param {string} multiPathSeparator - string by which paths should be split
 * @return {Object[]} - filtered entity path objects or entities
 */
export function filterEntityList({ entitiesOrPaths, filterObjects = [], multiPathSeparator = "" }) {
    const pathList = filterObjects.filter((o) => o.path);
    const regexList = filterObjects.filter((o) => o.regex);

    const filteredByRegex = regexList.flatMap((r) => {
        const regex = new RegExp(r.regex);
        return entitiesOrPaths.filter((o) => regex.test(o.path));
    });

    let filteredByPath;
    if (multiPathSeparator) {
        filteredByPath = entitiesOrPaths.filter((e) => {
            const expandedPaths = e.path.split(multiPathSeparator).map((p) => ({ path: p }));
            return isContainedByProperty(expandedPaths, pathList, "path");
        });
    } else {
        filteredByPath = lodash.intersectionBy(entitiesOrPaths, pathList, "path");
    }

    return lodash.uniqBy(filteredByRegex.concat(filteredByPath), "path");
}
