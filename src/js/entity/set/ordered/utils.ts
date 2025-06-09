import type { OrderedInMemoryEntityInSet } from "./OrderedInMemoryEntityInSetMixin";

/**
 * A comparison function to sort inSet entities by setId and index (descending by default).
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort for more info.
 */
export const compareEntitiesInOrderedSetForSorting = (
    a: OrderedInMemoryEntityInSet,
    b: OrderedInMemoryEntityInSet,
    setId: string,
    descending = true,
) => {
    // eslint-disable-next-line no-nested-ternary
    const aIndex = a
        ? a.getIndexByIdInOrderedSet(setId)
        : descending
        ? Number.POSITIVE_INFINITY
        : Number.NEGATIVE_INFINITY;
    // eslint-disable-next-line no-nested-ternary
    const bIndex = b
        ? b.getIndexByIdInOrderedSet(setId)
        : descending
        ? Number.POSITIVE_INFINITY
        : Number.NEGATIVE_INFINITY;
    return descending ? bIndex - aIndex : aIndex - bIndex;
};
