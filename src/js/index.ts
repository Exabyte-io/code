import { ArrayWithIds, RoundedArrayWithIds } from "./ArrayWithIds";
import * as context from "./context";
import * as entity from "./entity";
import * as utils from "./utils";
import * as validator from "./validator";
import { RoundedValueWithId, ValueWithId } from "./ValueWithId";
import { RoundedVector3D, Vector3D } from "./vector";

export {
    ArrayWithIds,
    ValueWithId,
    RoundedValueWithId,
    RoundedArrayWithIds,
    RoundedVector3D,
    Vector3D,
};
export { entity, context, utils, validator };
export { JsonSchemaValidator, jsonSchemaValidator } from "./validator";

const Code = {
    ArrayWithIds,
    ValueWithId,
    RoundedArrayWithIds,
    RoundedValueWithId,
    RoundedVector3D,
    Vector3D,
    entity,
    context,
    utils,
    validator,
};

export type CodeType = typeof Code;
export default Code;
