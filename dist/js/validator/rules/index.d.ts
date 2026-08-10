import type Ajv from "ajv";
/**
 * Shared AJV formats/keywords for the standalone validator.
 * App-specific formats (password, phone, username, email) are registered by the host.
 */
export default function addSharedFormatsAndKeywords(ajv: Ajv): void;
