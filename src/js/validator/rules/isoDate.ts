import Ajv from "ajv";
import { AnySchemaObject, DataValidationCxt } from "ajv/dist/types";

export default function addIsoDateKeyword(ajv: Ajv) {
    ajv.addKeyword({
        keyword: "isoDate",
        type: "string",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(
            _schema: boolean,
            data: unknown,
            _parentSchema?: AnySchemaObject,
            dataCxt?: DataValidationCxt,
        ) {
            if (data === null || typeof data === "undefined") {
                return true;
            }

            if (typeof data !== "string") {
                return false;
            }

            const isValid = !Number.isNaN(Date.parse(data));

            if (isValid && dataCxt) {
                dataCxt.parentData[dataCxt.parentDataProperty] = new Date(data);
            }

            return isValid;
        },
        errors: false,
        modifying: true,
        metaSchema: {
            type: "boolean",
        },
    });
}
