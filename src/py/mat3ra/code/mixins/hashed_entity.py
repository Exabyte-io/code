from typing import Any, Dict

from mat3ra.utils.object import calculate_hash_from_object


class HashedEntityMixin:
    """
    Mixin for entities that compute a deterministic hash from "meaningful fields".

    Mirrors the JS `HashedEntityMixin`: child classes override `get_hash_object()`,
    while `calculate_hash()` hashes that object.
    """

    def get_hash_object(self) -> Dict[str, Any]:  # pragma: no cover
        return {}

    def calculate_hash(self) -> str:
        return calculate_hash_from_object(self.get_hash_object())

    @property
    def hash(self) -> str:
        return self.calculate_hash()

