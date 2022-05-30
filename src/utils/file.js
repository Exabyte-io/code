const FILE_EXTENSION_TO_PROGRAMMING_LANGUAGE_MAP = {
    "in": "fortran",
    "sh": "shell",
    "bash": "shell",
    "zsh": "shell",
    "pbs": "shell",
    "py": "python"
};

/**
 * @summary Identifies language by file extension. Uses 'fortran' by default.
 * @param filename {String}
 * @param defaultLanguage {String}
 */
export function getProgrammingLanguageFromFileExtension(filename, defaultLanguage = 'fortran') {
    const fileExt = filename.split('.').pop().toLowerCase();
    return FILE_EXTENSION_TO_PROGRAMMING_LANGUAGE_MAP[fileExt] || defaultLanguage;
}
