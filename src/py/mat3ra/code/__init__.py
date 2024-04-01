from typing import Any, Dict, List, Optional, Union
import copy
import json
import jsonschema


class JSONSchema:
    pass


class EntityReferenceSchema:
    pass


def getValue(obj: Dict[str, Any], key: str, default: Any) -> Any:
    return obj.get(key, default)


def omit(obj: Dict[str, Any], keys: List[str]) -> Dict[str, Any]:
    return {k: v for k, v in obj.items() if k not in keys}


def set(obj: Dict[str, Any], key: str, value: Any) -> None:
    obj[key] = value


def clone(obj: Any) -> Any:
    return copy.deepcopy(obj)


def deepClone(obj: Any) -> Any:
    return copy.deepcopy(obj)


class ValidationErrorCode:
    IN_MEMORY_ENTITY_DATA_INVALID = "IN_MEMORY_ENTITY_DATA_INVALID"


class ErrorDetails:
    def __init__(self, error: Optional[Dict[str, Any]], json: Dict[str, Any], schema: JSONSchema):
        self.error = error
        self.json = json
        self.schema = schema


class EntityError(Exception):
    def __init__(self, code: ValidationErrorCode, details: Optional[ErrorDetails] = None):
        super().__init__(code)
        self.code = code
        self.details = details


class InMemoryEntity:
    @staticmethod
    def create(config: Dict[str, Any]) -> 'InMemoryEntity':
        return InMemoryEntity(config)

    _isDeepCloneRequired = False
    allowJsonSchemaTypesCoercing = False
    jsonSchema: Optional[JSONSchema] = None

    def __init__(self, config: Dict[str, Any] = {}) -> None:
        self._json = (self.__class__._isDeepCloneRequired and deepClone(config)) or clone(config)

    def prop(self, name: str, defaultValue: Any = None) -> Any:
        return getValue(self._json, name, defaultValue) or defaultValue

    def setProp(self, name: str, value: Any) -> None:
        set(self._json, name, value)

    def unsetProp(self, name: str) -> None:
        del self._json[name]

    def setProps(self, json: Dict[str, Any] = {}) -> 'InMemoryEntity':
        for key, value in json.items():
            self.setProp(key, value)
        return self

    def toJSON(self, exclude: List[str] = []) -> Dict[str, Any]:
        if self.__class__._isDeepCloneRequired:
            return self.toJSONSafe(exclude)
        else:
            return self.toJSONQuick(exclude)

    def toJSONSafe(self, exclude: List[str] = []) -> Dict[str, Any]:
        return self.clean(deepClone(omit(self._json, exclude)))

    def toJSONQuick(self, exclude: List[str] = []) -> Dict[str, Any]:
        return self.clean(clone(omit(self._json, exclude)))

    def clone(self, extraContext: Dict[str, Any] = {}) -> 'InMemoryEntity':
        return self.__class__({**self.toJSON(), **extraContext})

    @staticmethod
    def validateData(data: Dict[str, Any], clean: bool = False) -> Dict[str, Any]:
        if not InMemoryEntity.jsonSchema:
            return data
        if clean:
            print("Error: clean is not supported for InMemoryEntity.validateData")
        else:
            jsonschema.validate(data, InMemoryEntity.jsonSchema)
        return data

    def validate(self) -> None:
        if self._json:
            self.__class__.validateData(self._json)

    def clean(self, config: Dict[str, Any]) -> Dict[str, Any]:
        try:
            return self.__class__.validateData(config, True)
        except EntityError as err:
            print(json.dumps({
                'error': json.dumps(err.details.error),
                'json': json.dumps(err.details.json),
                'schema': json.dumps(err.details.schema),
            }))
            raise

    def isValid(self) -> bool:
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
        self.setProp("_id", id)

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

