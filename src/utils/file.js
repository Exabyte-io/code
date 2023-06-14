import fs from "fs";
import path from "path";

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

/** Get list of paths for files in a directory and filter by file extensions if provided.
 * @param {string} dirPath - Path to current directory, i.e. $PWD
 * @param {string[]} fileExtensions - File extensions to filter, e.g. `.yml`
 * @param {boolean} resolvePath - whether to resolve the paths of files
 * @returns {string[]} - Array of file paths
 */
export function getFilesInDirectory(dirPath, fileExtensions = [], resolvePath = true) {
    let fileNames = fs.readdirSync(dirPath);
    if (fileExtensions.length) {
        fileNames = fileNames.filter((dirItem) => fileExtensions.includes(path.extname(dirItem)));
    }
    if (resolvePath) return fileNames.map((fileName) => path.resolve(dirPath, fileName));
    return fileNames;
}

/**
 * Get list of directories contained in current directory.
 * @param {string} currentPath - current directory
 * @return {*}
 */
export function getDirectories(currentPath) {
    return fs
        .readdirSync(currentPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
}

/**
 * Construct object path compatible with lodash.get/lodash.set from file path.
 * Note: if no root path is provided the file's dirname is taken instead.
 * @param {string} filePath - Path to file.
 * @param {string} root - Path to a parent directory to construct relative path.
 * @return {string} - Object path reflecting file path.
 * @example
 * createObjectPathFromFilePath("/a/b/c/d/e.yml", "/a/b");
 * // "['c']['d']['e']"
 */
export function createObjectPathFromFilePath(filePath, root) {
    const dirname = path.dirname(filePath);
    const extension = path.extname(filePath);
    const basename = path.basename(filePath, extension);
    const parentDirs = root ? path.relative(root, dirname).split(path.sep) : [];
    return [...parentDirs, basename].map((item) => `['${item}']`).join("");
}
