export function removeNewLinesAndExtraSpaces(str: any): any;
/**
 * @summary Generates random alphanumeric string with a specified length.
 * Returns lowercase string which starts with letter.
 * @param length {Number}
 */
export function randomAlphanumeric(length: number): string;
export function toFixedLocale(number: any, precision: any): any;
/**
 * @summary Removes lines started with # character. Shebang (#!) is excluded.
 * @param text {String} text to remove comments from.
 * @param language {String} programming language of the text.
 * @return {String}
 */
export function removeCommentsFromSourceCode(text: string, language?: string): string;
/**
 * @summary Removes empty lines from a given string.
 * @param string {String} string to remove empty lines from.
 * @return {String}
 */
export function removeEmptyLinesFromString(string: string): string;
/**
 * converts simple number to roman.
 * @param {Number} num
 * @returns {String} - string
 */
export function convertArabicToRoman(num: number): string;
/**
 * Render name template based on config.
 * Use substitution map to replace a config value with a more readable variant.
 * NOTE: We currently iterate through the whole object. A more efficient albeit more verbose approach would be
 * to give the property path in the subsitution map, e.g., `{ "user.name": {"user001": "John Doe"} }`.
 * @param {string|undefined} template - Template for the name property
 * @param {Object} data - Entity config
 * @param {Object} substitutionMap - Maps object value to human-readable string
 * @return {string}
 * @example
 * generateName(
 *     "Hello {{user}}!",
 *     {user: "user001"},
 *     {user001: "John Doe"}
 * ); // "Hello John Doe!"
 */
export function renderTextWithSubstitutes(template: string | undefined, data: any, substitutionMap?: any): string;
/**
 * Find the next smallest version from a list of semantic version strings.
 * @param {string[]} versions - Array of semantic version strings.
 * @param {string} inputVersion - Version to compare to.
 * @returns {string | undefined}
 */
export function findPreviousVersion(versions: string[], inputVersion: string): string | undefined;
