from typing import Any, Dict, List, Optional, TypeVar

from pydantic import BaseModel

from .mixins import DefaultableMixin, HasDescriptionMixin, HasMetadataMixin, NamedMixin

import jsonschema
from mat3ra.utils import object as object_utils

from . import BaseUnderscoreJsonPropsHandler

T = TypeVar("T", bound="InMemoryEntityPydantic")


# TODO: remove in the next PR
class ValidationErrorCode:
    IN_MEMORY_ENTITY_DATA_INVALID = "IN_MEMORY_ENTITY_DATA_INVALID"


# TODO: remove in the next PR
class ErrorDetails:
    def __init__(self, error: Optional[Dict[str, Any]], json: Dict[str, Any], schema: Dict):
        self.error = error
        self.json = json
        self.schema = schema


# TODO: remove in the next PR
class EntityError(Exception):
    def __init__(self, code: ValidationErrorCode, details: Optional[ErrorDetails] = None):
        super().__init__(code)
        self.code = code
        self.details = details


class InMemoryEntityPydantic(BaseModel):
    model_config = {
        "arbitrary_types_allowed": True
    }

    @classmethod
    def get_cls(cls) -> str:
        return cls.__name__

    def get_cls_name(self) -> str:
        return self.__class__.__name__

    def to_dict(self, exclude: Optional[List[str]] = None) -> Dict[str, Any]:
        return self.model_dump(exclude=set(exclude) if exclude else None)

    def to_json(self, exclude: Optional[List[str]] = None) -> str:
        return self.model_dump_json(exclude=set(exclude) if exclude else None)

    @classmethod
    def create(cls: type[T], config: Dict[str, Any]) -> T:
        return cls(**config)

    @classmethod
    def from_json(cls: type[T], json_str: str) -> T:
        return cls.model_validate_json(json_str)

    def clone(self: T, extra_context: Optional[Dict[str, Any]] = None) -> T:
        return self.model_copy(update=extra_context or {})


# TODO: remove in the next PR
class InMemoryEntity(BaseUnderscoreJsonPropsHandler):
    jsonSchema: Optional[Dict] = None

    @classmethod
    def get_cls(cls) -> str:
        return cls.__name__

    @property
    def cls(self) -> str:
        return self.__class__.__name__

    def get_cls_name(self) -> str:
        return self.__class__.__name__

    @classmethod
    def create(cls, config: Dict[str, Any]) -> Any:
        return cls(config)

    def to_json(self, exclude: List[str] = []) -> Dict[str, Any]:
        return self.clean(object_utils.clone_deep(object_utils.omit(self._json, exclude)))

    def clone(self, extra_context: Dict[str, Any] = {}) -> Any:
        config = self.to_json()
        config.update(extra_context)
        # To avoid:
        #   Argument 1 to "__init__" of "BaseUnderscoreJsonPropsHandler" has incompatible type "Dict[str, Any]";
        #   expected "BaseUnderscoreJsonPropsHandler"
        return self.__class__(config)

    @staticmethod
    def validate_data(data: Dict[str, Any], clean: bool = False):
        if clean:
            print("Error: clean is not supported for InMemoryEntity.validateData")
        if InMemoryEntity.jsonSchema:
            jsonschema.validate(data, InMemoryEntity.jsonSchema)

    def validate(self) -> None:
        if self._json:
            self.__class__.validate_data(self._json)

    def clean(self, config: Dict[str, Any]) -> Dict[str, Any]:
        # Not implemented, consider the below for the implementation
        # https://stackoverflow.com/questions/44694835/remove-properties-from-json-object-not-present-in-schema
        return config

    def is_valid(self) -> bool:
        try:
            self.validate()
            return True
        except EntityError:
            return False

    # Properties
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
        if by_id_only:
            return {"_id": self.id}
        else:
            return {"_id": self.id, "slug": self.slug, "cls": self.get_cls_name()}


class HasDescriptionHasMetadataNamedDefaultableInMemoryEntityPydantic(
    InMemoryEntityPydantic, DefaultableMixin, NamedMixin, HasMetadataMixin, HasDescriptionMixin
):
    pass
