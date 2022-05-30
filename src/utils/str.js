export function removeNewLinesAndExtraSpaces(str) {
    return str.replace(/\n|\r/g, "").replace(/  +/g, ' ')
}
