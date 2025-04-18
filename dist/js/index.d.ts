import { ArrayWithIds } from "./ArrayWithIds";
import * as context from "./context";
import * as entity from "./entity";
import * as utils from "./utils";
import { ValueWithId } from "./ValueWithId";
export { ArrayWithIds, ValueWithId };
export { entity, context, utils };
declare const Code: {
    ArrayWithIds: typeof ArrayWithIds;
    ValueWithId: typeof ValueWithId;
    entity: typeof entity;
    context: typeof context;
    utils: typeof utils;
};
export type CodeType = typeof Code;
export default Code;
