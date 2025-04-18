import { ArrayWithIds, RoundedArrayWithIds } from "./ArrayWithIds";
import * as context from "./context";
import * as entity from "./entity";
import * as utils from "./utils";
import { RoundedValueWithId, ValueWithId } from "./ValueWithId";

export { ArrayWithIds, ValueWithId, RoundedValueWithId, RoundedArrayWithIds };
export { entity, context, utils };

const Code = {
    ArrayWithIds,
    ValueWithId,
    RoundedArrayWithIds,
    RoundedValueWithId,
    entity,
    context,
    utils,
};

export type CodeType = typeof Code;
export default Code;
