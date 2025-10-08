import * as path from "path";

// Use relative path from the test directory - this will be resolved at runtime
export const FIXTURES_DIR = path.resolve(process.cwd(), "tests/js/fixtures");
export const YAML_COMBINE_FILE = path.resolve(FIXTURES_DIR, "yaml_combine_tag.yml");
export const YAML_LIST_TO_STRING_FILE = path.resolve(FIXTURES_DIR, "yaml_listToString_tag.yml");
export const YAML_PARAMETER_FILE = path.resolve(FIXTURES_DIR, "yaml_parameter_tag.yml");
export const YAML_ESSE_FILE = path.resolve(FIXTURES_DIR, "yaml_esse_tag.yml");
export const YAML_INCLUDE_FILE = path.resolve(FIXTURES_DIR, "yaml_include_tag.yml");
export const YAML_FLATTEN_FILE = path.resolve(FIXTURES_DIR, "yaml_flatten_tag.yml");
export const YAML_READFILE_FILE = path.resolve(FIXTURES_DIR, "yaml_readFile_tag.yml");
export const YAML_CONCAT_STRING_FILE = path.resolve(FIXTURES_DIR, "yaml_concatString_tag.yml");
