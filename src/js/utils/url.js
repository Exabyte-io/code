/** Check whether URL component is encoded already.
 * @see [MDN]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent}
 * @param {String} x
 * @returns {boolean}
 */
export function containsEncodedComponents(x) {
    // ie ?,=,&,/ etc
    return decodeURI(x) !== decodeURIComponent(x);
}
