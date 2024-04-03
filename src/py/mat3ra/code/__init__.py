from typing import Any, Dict, List, Optional, Union

import jsonschema

from mat3ra.utils import object as object_utils


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


class InMemoryEntity:
    _isDeepCloneRequired = False
    allowJsonSchemaTypesCoercing = False
    jsonSchema: Optional[Dict] = None

    @staticmethod
    def create(config: Dict[str, Any]) -> 'InMemoryEntity':
        return InMemoryEntity(config)

    def __init__(self, config: Dict[str, Any] = {}) -> None:
        self._json = object_utils.clone_deep(
            config) if self.__class__._isDeepCloneRequired else object_utils.clone_shallow(config)

    def prop(self, name: str, default_value: Any = None) -> Any:
        return self._json.get(name, default_value)

    def set_prop(self, name: str, value: Any) -> None:
        object_utils.set(self._json, name, value)

    def unset_prop(self, name: str) -> None:
        del self._json[name]

    def set_props(self, json: Dict[str, Any] = {}) -> 'InMemoryEntity':
        for key, value in json.items():
            self.set_prop(key, value)
        return self

    def to_json(self, exclude: List[str] = []) -> Dict[str, Any]:
        if self.__class__._isDeepCloneRequired:
            return self.to_json_safe(exclude)
        else:
            return self.to_json_quick(exclude)

    def to_json_safe(self, exclude: List[str] = []) -> Dict[str, Any]:
        return self.clean(object_utils.clone_deep(object_utils.omit(self._json, exclude)))

    def to_json_quick(self, exclude: List[str] = []) -> Dict[str, Any]:
        return self.clean(object_utils.clone_shallow(object_utils.omit(self._json, exclude)))

    def clone(self, extra_context: Dict[str, Any] = {}) -> 'InMemoryEntity':
        return self.__class__({**self.to_json(), **extra_context})

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

    @property
    def id(self) -> str:
        return self.prop("_id", "")

    @id.setter
    def id(self, id: str) -> None:
        self.set_prop("_id", id)

    @classmethod
    def get_cls(cls) -> str:
        return cls.__name__

    @property
    def cls(self) -> str:
        return self.__class__.__name__

    def getClsName(self) -> str:
        return self.__class__.__name__

    @property
    def slug(self) -> str:
        return self.prop("slug", "")

    @property
    def isSystemEntity(self) -> bool:
        return bool(self.prop("systemName", ""))

    def getAsEntityReference(self, byIdOnly: bool = False) -> dict[str, str]:
        if byIdOnly:
            return {"_id": self.id}
        else:
            return {"_id": self.id, "slug": self.slug, "cls": self.getClsName()}

    @staticmethod
    def getEntityByName(entities: List['InMemoryEntity'], entity: str, name: str) -> 'InMemoryEntity':
        if not name:
            filtered = [ent for ent in entities if ent.prop("isDefault") == True]
            if not filtered:
                filtered = [entities[0]]
        else:
            filtered = [ent for ent in entities if ent.prop("name") == name]
        if len(filtered) != 1:
            print(f"found {len(filtered)} entity {entity} with name {name} expected 1")
        return filtered[0]
