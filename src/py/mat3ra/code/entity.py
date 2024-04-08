from typing import Any, Dict, List, Optional

import jsonschema
from mat3ra.utils import object as object_utils

from . import BaseUnderscoreJsonPropsHandler
from .mixins import DefaultableMixin, HasDescriptionMixin, HasMetadataMixin, NamedMixin


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
        return self.__class__.__init__({**self.to_json(), **extra_context})

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


class HasDescriptionHasMetadataNamedDefaultableInMemoryEntity(
    InMemoryEntity, DefaultableMixin, NamedMixin, HasMetadataMixin, HasDescriptionMixin
):
    pass
