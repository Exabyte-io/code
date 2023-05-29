import lodash from "lodash";

/**
 * Filter list of entity paths or entities by paths and regular expressions.
 * @param {Object[]} entitiesOrPaths - Array of objects defining entity path
 * @param {Array<{ path: string }|{ regex: string }|{ regex: RegExp }>} filterObjects - Array of path or regular expression objects
 * @return {Object[]} - filtered entity path objects or entities
 */
export function filterEntityList({ entitiesOrPaths, filterObjects = [] }) {
    const pathList = filterObjects.filter((o) => o.path);
    const regexList = filterObjects.filter((o) => o.regex);

    const filtered = regexList
        .flatMap((r) => {
            const regex = new RegExp(r.regex);
            return entitiesOrPaths.filter((o) => regex.test(o.path));
        })
        .concat(lodash.intersectionBy(entitiesOrPaths, pathList, "path"));

    return lodash.uniqBy(filtered, "path");
}
