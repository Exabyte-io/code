"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObjectPathFromFilePath = exports.getDirectories = exports.getFilesInDirectory = exports.formatFileSize = exports.getProgrammingLanguageFromFileExtension = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
function getProgrammingLanguageFromFileExtension(filename, defaultLanguage = "fortran") {
    const fileExt = filename.split(".").pop().toLowerCase();
    return FILE_EXTENSION_TO_PROGRAMMING_LANGUAGE_MAP[fileExt] || defaultLanguage;
}
exports.getProgrammingLanguageFromFileExtension = getProgrammingLanguageFromFileExtension;
/**
 * @summary Formats a given file size.
 * @param size {Number} file size.
 * @param decimals {Number} number of decimals to round.
 */
function formatFileSize(size, decimals = 2) {
    if (size === 0)
        return "0 Bytes";
    const index = Math.floor(Math.log(size) / Math.log(1024));
    const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    return parseFloat((size / 1024 ** index).toFixed(decimals)) + " " + units[index];
}
exports.formatFileSize = formatFileSize;
/** Get list of paths for files in a directory and filter by file extensions if provided.
 * @param {string} dirPath - Path to current directory, i.e. $PWD
 * @param {string[]} fileExtensions - File extensions to filter, e.g. `.yml`
 * @param {boolean} resolvePath - whether to resolve the paths of files
 * @returns {string[]} - Array of file paths
 */
function getFilesInDirectory(dirPath, fileExtensions = [], resolvePath = true) {
    let fileNames = fs_1.default.readdirSync(dirPath);
    if (fileExtensions.length) {
        fileNames = fileNames.filter((dirItem) => fileExtensions.includes(path_1.default.extname(dirItem)));
    }
    if (resolvePath)
        return fileNames.map((fileName) => path_1.default.resolve(dirPath, fileName));
    return fileNames;
}
exports.getFilesInDirectory = getFilesInDirectory;
/**
 * Get list of directories contained in current directory.
 * @param {string} currentPath - current directory
 * @return {*}
 */
function getDirectories(currentPath) {
    return fs_1.default
        .readdirSync(currentPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
}
exports.getDirectories = getDirectories;
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
function createObjectPathFromFilePath(filePath, root) {
    const dirname = path_1.default.dirname(filePath);
    const extension = path_1.default.extname(filePath);
    const basename = path_1.default.basename(filePath, extension);
    const parentDirs = root ? path_1.default.relative(root, dirname).split(path_1.default.sep) : [];
    return [...parentDirs, basename].map((item) => `['${item}']`).join("");
}
exports.createObjectPathFromFilePath = createObjectPathFromFilePath;
