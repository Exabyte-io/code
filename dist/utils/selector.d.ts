/**
 * Forms a search query selector for MongoDB
 * @param {Object} searchQuery - db query
 * @param {Array[String]} fields - keys in the target document to search for
 * @return {Object}
 */
export function getSearchQuerySelector(searchQuery: any, fields?: any): any;
