const __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              let desc = Object.getOwnPropertyDescriptor(m, k);
              if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get() {
                          return m[k];
                      },
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
const __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
              o.default = v;
          });
const __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        const result = {};
        if (mod != null)
            for (const k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.YAML_CONCAT_STRING_FILE =
    exports.YAML_READFILE_FILE =
    exports.YAML_FLATTEN_FILE =
    exports.YAML_INCLUDE_FILE =
    exports.YAML_ESSE_FILE =
    exports.YAML_PARAMETER_FILE =
    exports.YAML_LIST_TO_STRING_FILE =
    exports.YAML_COMBINE_FILE =
    exports.FIXTURES_DIR =
        void 0;
const path = __importStar(require("path"));

exports.FIXTURES_DIR = path.resolve(__dirname, "./fixtures");
exports.YAML_COMBINE_FILE = path.resolve(exports.FIXTURES_DIR, "yaml_combine_tag.yml");
exports.YAML_LIST_TO_STRING_FILE = path.resolve(exports.FIXTURES_DIR, "yaml_listToString_tag.yml");
exports.YAML_PARAMETER_FILE = path.resolve(exports.FIXTURES_DIR, "yaml_parameter_tag.yml");
exports.YAML_ESSE_FILE = path.resolve(exports.FIXTURES_DIR, "yaml_esse_tag.yml");
exports.YAML_INCLUDE_FILE = path.resolve(exports.FIXTURES_DIR, "yaml_include_tag.yml");
exports.YAML_FLATTEN_FILE = path.resolve(exports.FIXTURES_DIR, "yaml_flatten_tag.yml");
exports.YAML_READFILE_FILE = path.resolve(exports.FIXTURES_DIR, "yaml_readFile_tag.yml");
exports.YAML_CONCAT_STRING_FILE = path.resolve(exports.FIXTURES_DIR, "yaml_concatString_tag.yml");
