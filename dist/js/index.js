"use strict";
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get: function () {
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
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
              o["default"] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    (function () {
        var ownKeys = function (o) {
            ownKeys =
                Object.getOwnPropertyNames ||
                function (o) {
                    var ar = [];
                    for (var k in o)
                        if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
                    return ar;
                };
            return ownKeys(o);
        };
        return function (mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null)
                for (var k = ownKeys(mod), i = 0; i < k.length; i++)
                    if (k[i] !== "default") __createBinding(result, mod, k[i]);
            __setModuleDefault(result, mod);
            return result;
        };
    })();
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils =
    exports.context =
    exports.entity =
    exports.RoundedArrayWithIds =
    exports.RoundedValueWithId =
    exports.ValueWithId =
    exports.ArrayWithIds =
        void 0;
const ArrayWithIds_1 = require("./ArrayWithIds");
Object.defineProperty(exports, "ArrayWithIds", {
    enumerable: true,
    get: function () {
        return ArrayWithIds_1.ArrayWithIds;
    },
});
Object.defineProperty(exports, "RoundedArrayWithIds", {
    enumerable: true,
    get: function () {
        return ArrayWithIds_1.RoundedArrayWithIds;
    },
});
const context = __importStar(require("./context"));
exports.context = context;
const entity = __importStar(require("./entity"));
exports.entity = entity;
const utils = __importStar(require("./utils"));
exports.utils = utils;
const ValueWithId_1 = require("./ValueWithId");
Object.defineProperty(exports, "RoundedValueWithId", {
    enumerable: true,
    get: function () {
        return ValueWithId_1.RoundedValueWithId;
    },
});
Object.defineProperty(exports, "ValueWithId", {
    enumerable: true,
    get: function () {
        return ValueWithId_1.ValueWithId;
    },
});
const Code = {
    ArrayWithIds: ArrayWithIds_1.ArrayWithIds,
    ValueWithId: ValueWithId_1.ValueWithId,
    RoundedArrayWithIds: ArrayWithIds_1.RoundedArrayWithIds,
    RoundedValueWithId: ValueWithId_1.RoundedValueWithId,
    entity,
    context,
    utils,
};
exports.default = Code;
