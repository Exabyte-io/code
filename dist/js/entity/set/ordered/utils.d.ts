import type { OrderedInMemoryEntityInSet } from "./OrderedInMemoryEntityInSetMixin";
/**
 * A comparison function to sort inSet entities by setId and index (descending by default).
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort for more info.
 */
export declare const compareEntitiesInOrderedSetForSorting: (a: OrderedInMemoryEntityInSet, b: OrderedInMemoryEntityInSet, setId: string, descending?: boolean) => number;
