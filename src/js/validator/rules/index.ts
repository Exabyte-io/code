import addJsonSchemaToTypescriptKeywords from "@mat3ra/esse/dist/js/utils/ajvKeywords/jsonSchemaToTypescriptKeywords";
import type Ajv from "ajv";

import addEqualToFieldKeyword from "./equalTo";
import addIsoDateKeyword from "./isoDate";

/**
 * Shared AJV formats/keywords for the standalone validator.
 * App-specific formats (password, phone, username, email) are registered by the host.
 */
export default function addSharedFormatsAndKeywords(ajv: Ajv): void {
    addJsonSchemaToTypescriptKeywords(ajv);
    addEqualToFieldKeyword(ajv);
    addIsoDateKeyword(ajv);
}
