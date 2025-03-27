from typing import Any, Dict, List, Optional, TypeVar

import jsonschema
from pydantic import BaseModel

from .mixins import DefaultableMixin, HasDescriptionMixin, HasMetadataMixin, NamedMixin

T = TypeVar("T", bound="InMemoryEntity")

class InMemoryEntity(BaseModel):
    class Config:
        arbitrary_types_allowed = True

    @classmethod
    def get_cls(cls) -> str:
        return cls.__name__

    def get_cls_name(self) -> str:
        return self.__class__.__name__

    @property
    def id(self) -> str:
        return self.model_fields.get("_id", {}).get("default", "")

    def get_as_entity_reference(self, by_id_only: bool = False) -> Dict[str, str]:
        base = {"_id": self.id}
        if not by_id_only:
            base.update({"cls": self.get_cls_name()})
        return base

    def to_dict(self, exclude: Optional[List[str]] = None) -> Dict[str, Any]:
        return self.model_dump(exclude=set(exclude) if exclude else None)

    def to_json(self, exclude: Optional[List[str]] = None) -> str:
        return self.model_dump_json(exclude=set(exclude) if exclude else None)

    @classmethod
    def create(cls: type[T], config: Dict[str, Any]) -> T:
        return cls.model_validate(config)

    @classmethod
    def from_json(cls: type[T], json_str: str) -> T:
        return cls.model_validate_json(json_str)

    def clone(self: T, extra_context: Optional[Dict[str, Any]] = None) -> T:
        return self.model_copy(update=extra_context or {})

    def validate_against_schema(self, schema: Dict[str, Any]) -> None:
        jsonschema.validate(self.to_dict(), schema)


class HasDescriptionHasMetadataNamedDefaultableInMemoryEntity(
    InMemoryEntity, DefaultableMixin, NamedMixin, HasMetadataMixin, HasDescriptionMixin
):
    pass
