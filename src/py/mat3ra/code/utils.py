import hashlib
import json
import re
from typing import Any


def sort_keys_deep(obj: Any) -> Any:
    """Mirrors JS sortKeysDeepForObject: recursively sort object keys alphabetically."""
    if callable(getattr(obj, "model_dump", None)):
        return sort_keys_deep(obj.model_dump(mode="json", exclude_none=True))
    if isinstance(obj, list):
        return [sort_keys_deep(item) for item in obj]
    if isinstance(obj, dict):
        return {k: sort_keys_deep(obj[k]) for k in sorted(obj.keys())}
    return obj


def calculate_hash_from_object(obj: Any) -> str:
    """Mirrors JS calculateHashFromObject: MD5 of JSON.stringify(sortKeysDeep(obj))."""
    message = json.dumps(sort_keys_deep(obj), separators=(",", ":"))
    return hashlib.md5(message.encode()).hexdigest()


def remove_timestampable_keys(config: dict) -> dict:
    """Mirrors JS removeTimestampableKeysFromConfig: removes createdAt, updatedAt, removedAt."""
    return {k: v for k, v in config.items() if k not in ("createdAt", "updatedAt", "removedAt")}


def remove_comments_from_source_code(text: str, language: str = "shell") -> str:
    """Mirrors JS removeCommentsFromSourceCode: removes lines starting with # (except shebang)."""
    return re.sub(r"^(\s+)?#(?!!).*$", "", text, flags=re.MULTILINE)


def remove_empty_lines_from_string(text: str) -> str:
    """Mirrors JS removeEmptyLinesFromString: removes empty lines and trims."""
    return re.sub(r"^\s*[\r\n]", "", text, flags=re.MULTILINE).strip()

