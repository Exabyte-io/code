/**
 * A comparison function to sort inSet entities by setId and index (descending by default).
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort for more info.
 */
export const compareEntitiesInOrderedSetForSorting = (a, b, setId, descending = true) => {
    const aIndex = a ? a.getIndexByIdInOrderedSet(setId) : descending ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    const bIndex = b ? b.getIndexByIdInOrderedSet(setId) : descending ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    return descending ? (bIndex - aIndex) : (aIndex - bIndex);
};
