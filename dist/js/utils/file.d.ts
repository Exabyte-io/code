/**
 * @summary Identifies language by file extension. Uses 'fortran' by default.
 * @param filename {String}
 * @param defaultLanguage {String}
 */
export function getProgrammingLanguageFromFileExtension(filename: string, defaultLanguage?: string): any;
/**
 * @summary Formats a given file size.
 * @param size {Number} file size.
 * @param decimals {Number} number of decimals to round.
 */
export function formatFileSize(size: number, decimals?: number): string;
/** Get list of paths for files in a directory and filter by file extensions if provided.
 * @param {string} dirPath - Path to current directory, i.e. $PWD
 * @param {string[]} fileExtensions - File extensions to filter, e.g. `.yml`
 * @param {boolean} resolvePath - whether to resolve the paths of files
 * @returns {string[]} - Array of file paths
 */
export function getFilesInDirectory(dirPath: string, fileExtensions?: string[], resolvePath?: boolean): string[];
/**
 * Get list of directories contained in current directory.
 * @param {string} currentPath - current directory
 * @return {*}
 */
export function getDirectories(currentPath: string): any;
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
export function createObjectPathFromFilePath(filePath: string, root: string): string;
