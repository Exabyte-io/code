import { ArrayWithIds } from "./ArrayWithIds";
import * as context from "./context";
import * as entity from "./entity";
import * as utils from "./utils";
import { ValueWithId } from "./ValueWithId";

export { ArrayWithIds, ValueWithId };
export { entity, context, utils };

const Code = {
    ArrayWithIds,
    ValueWithId,
    entity,
    context,
    utils,
};

export type CodeType = typeof Code;
export default Code;
