const FILE_EXTENSION_TO_PROGRAMMING_LANGUAGE_MAP = {
    in: "fortran",
    sh: "shell",
    bash: "shell",
    zsh: "shell",
    pbs: "shell",
    py: "python",
};

/**
 * @summary Identifies language by file extension. Uses 'fortran' by default.
 * @param filename {String}
 * @param defaultLanguage {String}
 */
export function getProgrammingLanguageFromFileExtension(filename, defaultLanguage = "fortran") {
    const fileExt = filename.split(".").pop().toLowerCase();
    return FILE_EXTENSION_TO_PROGRAMMING_LANGUAGE_MAP[fileExt] || defaultLanguage;
}

/**
 * @summary Formats a given file size.
 * @param size {Number} file size.
 * @param decimals {Number} number of decimals to round.
 */
export function formatFileSize(size, decimals = 2) {
    if (size === 0) return "0 Bytes";
    const index = Math.floor(Math.log(size) / Math.log(1024));
    const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    return parseFloat((size / 1024 ** index).toFixed(decimals)) + " " + units[index];
}
