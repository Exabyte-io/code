from typing import Any, Dict, List, Optional, TypeVar

import jsonschema
from pydantic import BaseModel, Field

from .mixins import DefaultableMixin, HasDescriptionMixin, HasMetadataMixin, NamedMixin

T = TypeVar("T", bound="InMemoryEntity")

class ValidationErrorCode:
    IN_MEMORY_ENTITY_DATA_INVALID = "IN_MEMORY_ENTITY_DATA_INVALID"


class ErrorDetails:
    def __init__(self, error: Optional[Dict[str, Any]], json: Dict[str, Any], schema: Dict):
        self.error = error
        self.json = json
        self.schema = schema


class EntityError(Exception):
    def __init__(self, code: ValidationErrorCode, details: Optional[ErrorDetails] = None):
        super().__init__(code)
        self.code = code
        self.details = details



class InMemoryEntity(BaseModel):
    jsonSchema: Optional[Dict[str, Any]] = Field(default=None, exclude=True)

    class Config:
        arbitrary_types_allowed = True

    # --- Identity and Meta ---
    @classmethod
    def get_cls(cls) -> str:
        return cls.__name__

    def get_cls_name(self) -> str:
        return self.__class__.__name__

    @property
    def cls(self) -> str:
        return self.__class__.__name__

    @property
    def id(self) -> str:
        return self.prop("_id", "")

    @id.setter
    def id(self, id: str) -> None:
        self.set_prop("_id", id)

    @property
    def slug(self) -> str:
        return self.prop("slug", "")

    def get_as_entity_reference(self, by_id_only: bool = False) -> Dict[str, str]:
        base = {"_id": self.id}
        if not by_id_only:
            base.update({"slug": self.slug, "cls": self.get_cls_name()})
        return base

    # --- Serialization ---
    def to_dict(self, exclude: Optional[List[str]] = None) -> Dict[str, Any]:
        return self.model_dump(exclude=set(exclude) if exclude else None)

    def to_json(self, exclude: Optional[List[str]] = None) -> str:
        return self.model_dump_json(exclude=set(exclude) if exclude else None)

    # --- Instantiation ---
    @classmethod
    def create(cls: type[T], config: Dict[str, Any]) -> T:
        return cls(**config)

    def clone(self: T, extra_context: Optional[Dict[str, Any]] = None) -> T:
        """Return a copy of this entity with optional updated fields."""
        extra_context = extra_context or {}
        return self.model_copy(update=extra_context)

    # --- Validation ---
    def validate(self) -> None:
        if self._json and self.jsonSchema:
            try:
                jsonschema.validate(self._json, self.jsonSchema)
            except jsonschema.exceptions.ValidationError as err:
                raise EntityError(
                    ValidationErrorCode.IN_MEMORY_ENTITY_DATA_INVALID,
                    ErrorDetails(error=err, json=self._json, schema=self.jsonSchema),
                )

    @staticmethod
    def validate_data(data: Dict[str, Any], clean: bool = False):
        if clean:
            raise NotImplementedError("clean=True not supported yet.")
        if InMemoryEntity.jsonSchema:
            jsonschema.validate(data, InMemoryEntity.jsonSchema)

    def is_valid(self) -> bool:
        try:
            self.validate()
            return True
        except EntityError:
            return False

    def clean(self, config: Dict[str, Any]) -> Dict[str, Any]:
        # TODO: implement if needed, or use model_rebuild if schema evolves
        return config


class HasDescriptionHasMetadataNamedDefaultableInMemoryEntity(
    InMemoryEntity, DefaultableMixin, NamedMixin, HasMetadataMixin, HasDescriptionMixin
):
    pass
