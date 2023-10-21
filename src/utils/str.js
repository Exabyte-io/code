import lodash from "lodash";
import nunjucks from "nunjucks";
import semverCoerce from "semver/functions/coerce";
import semverLt from "semver/functions/lt";
import semverRcompare from "semver/functions/rcompare";
import _ from "underscore";

export function removeNewLinesAndExtraSpaces(str) {
    return str.replace(/[\n\r]/g, "").replace(/  +/g, " ");
}

/**
 * @summary Generates random alphanumeric string with a specified length.
 * Returns lowercase string which starts with letter.
 * @param length {Number}
 */
export function randomAlphanumeric(length) {
    // numerical value – create random alphanumeric string
    // Start from char at position 2, because Math.random().toString(36) starts with "0."
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    // Random letter is required in generated string because of when
    // the result is used as username and contains only numbers, the
    // slug will be inappropriate (e.g., "user-1232", "user-12" both have "user" as slug).
    return (
        randomLetter +
        Math.random()
            .toString(36)
            .substring(2, 2 + length - 1)
    );
}

export function toFixedLocale(number, precision) {
    if (_.isNumber(number)) {
        return number.toFixed(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return number;
}

/**
 * @summary Removes lines started with # character. Shebang (#!) is excluded.
 * @param text {String} text to remove comments from.
 * @param language {String} programming language of the text.
 * @return {String}
 */
export function removeCommentsFromSourceCode(text, language = "shell") {
    const regexList = {
        shell: /^(\s+)?#(?!!).*$/gm,
    };
    return text.replace(regexList[language], "");
}

/**
 * @summary Removes empty lines from a given string.
 * @param string {String} string to remove empty lines from.
 * @return {String}
 */
export function removeEmptyLinesFromString(string) {
    // remove "\n" on empty lines AND the very last "\n"
    return string.replace(/^\s*[\r\n]/gm, "").trim();
}

/**
 * converts simple number to roman.
 * @param {Number} num
 * @returns {String} - string
 */
export function convertArabicToRoman(num) {
    const roman = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };
    let str = "";

    // eslint-disable-next-line no-restricted-syntax
    for (const i of Object.keys(roman)) {
        const q = Math.floor(num / roman[i]);
        // eslint-disable-next-line no-param-reassign
        num -= q * roman[i];
        str += i.repeat(q);
    }

    return str;
}

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
export function renderTextWithSubstitutes(template, data, substitutionMap = {}) {
    if (!template) return "";
    // Create a copy of data to avoid modifying the original
    const renderData = lodash.cloneDeep(data);

    // Helper function for recursive substitution
    function substituteNested(obj) {
        if (!lodash.isPlainObject(obj)) {
            return;
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(obj)) {
            if (lodash.isPlainObject(value)) {
                substituteNested(value);
            } else if (Array.isArray(value)) {
                value.forEach((val) => substituteNested(val));
            } else if (substitutionMap[value]) {
                obj[key] = substitutionMap[value];
            }
        }
    }

    substituteNested(renderData);
    return nunjucks.renderString(template, renderData);
}

/**
 * Find the next smallest version from a list of semantic version strings.
 * @param {string[]} versions - Array of semantic version strings.
 * @param {string} inputVersion - Version to compare to.
 * @returns {string | undefined}
 */
export function findPreviousVersion(versions, inputVersion) {
    const version = semverCoerce(inputVersion);
    const versions_ = versions
        .map((v) => ({ raw: v, coerced: semverCoerce(v) }))
        .sort((a, b) => semverRcompare(a.coerced, b.coerced));
    const prev = versions_.find((o) => semverLt(o.coerced, version));
    return prev?.raw;
}
