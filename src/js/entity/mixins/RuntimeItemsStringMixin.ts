import {
    type RuntimeItemsStringSchemaMixin,
    runtimeItemsStringSchemaMixin,
} from "../../generated/RuntimeItemsStringSchemaMixin";
import type { Constructor } from "../../utils/types";

export type RuntimeItemsString = RuntimeItemsStringSchemaMixin;

export type RuntimeItemsStringInMemoryEntity = RuntimeItemsString;

export type RuntimeItemsStringInMemoryEntityConstructor =
    Constructor<RuntimeItemsStringInMemoryEntity>;

export const runtimeItemsStringMixin = runtimeItemsStringSchemaMixin;
