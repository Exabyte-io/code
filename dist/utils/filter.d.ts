interface PathObject {
    path: string;
}
export interface FilterObject {
    path?: string;
    regex?: RegExp;
}
interface FilterEntityListProps {
    entitiesOrPaths: PathObject[];
    filterObjects?: FilterObject[];
    multiPathSeparator?: string;
}
/**
 * Filter list of entity paths or entities by paths and regular expressions.
 * @return {Object[]} - filtered entity path objects or entities
 */
export declare function filterEntityList({ entitiesOrPaths, filterObjects, multiPathSeparator, }: FilterEntityListProps): PathObject[];
export {};
