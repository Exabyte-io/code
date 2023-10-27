import fs from "fs";
import yaml from "js-yaml";
import setValue from "lodash/set";
import path from "path";

import { JsYamlAllSchemas } from "./yaml";

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

/**
 * Reads asset file and stores asset data in target object under object path which reflects the file system.
 * @param {Object} targetObject - Object in which asset data should be stored
 * @param {string} assetPath - Absolute path to asset file.
 * @param {string} assetRoot - Path to asset root directory to construct relative path.
 */
export function loadAndInsertAssetData(targetObject, assetPath, assetRoot) {
    const fileContent = fs.readFileSync(assetPath, "utf8");
    const data = yaml.load(fileContent, { schema: JsYamlAllSchemas });
    const objectPath = createObjectPathFromFilePath(assetPath, assetRoot);
    setValue(targetObject, objectPath, data);
}

/**
 * Traverse asset folder recursively and load Yaml asset files.
 * @param currPath {string} - path to asset directory
 * @param {Object} targetObj - Object in which assets are assigned
 * @param {string} assetRoot - Path to asset root directory to construct relative path.
 */
export function getAssetDataFromPath(currPath, targetObj, assetRoot) {
    const branches = getDirectories(currPath);
    const assetFiles = getFilesInDirectory(currPath, [".yml", ".yaml"], false);

    assetFiles.forEach((asset) => {
        try {
            loadAndInsertAssetData(targetObj, path.join(currPath, asset), assetRoot);
        } catch (e) {
            console.log(e);
        }
    });
    branches.forEach((b) => {
        getAssetDataFromPath(path.resolve(currPath, b), targetObj, assetRoot);
    });
}

/**
 * Serialize object from Yaml as JS source file.
 * @param {object} obj
 * @param {string} obj.assetPath - Path to Yaml asset.
 * @param {string} obj.targetPath - Path to target JS source file.
 * @param {string} obj.dataKey - Object key for data in target JS source file.
 * @param {boolean} obj.debug - Whether to print messages to console.
 * @param {boolean} obj.eslintDisable - Whether add eslint-disable flag to top of file.
 */
export function buildJsAssetFromYaml({
    assetPath,
    targetPath,
    dataKey = "",
    debug = true,
    eslintDisable = true,
}) {
    const fileContent = fs.readFileSync(assetPath);
    const obj = yaml.load(fileContent, { schema: JsYamlAllSchemas });
    const ignore = eslintDisable ? "/* eslint-disable */\n" : "";
    fs.writeFileSync(
        targetPath,
        ignore + `module.exports = {${dataKey}: ` + JSON.stringify(obj) + "}\n",
        "utf8",
    );
    if (debug) console.log(`Written asset "${assetPath}" to "${targetPath}"`);
}
