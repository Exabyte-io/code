import json
from enum import Enum
from typing import Optional

from mat3ra.code.entity import InMemoryEntityPydantic, InMemoryEntitySnakeCase
from pydantic import BaseModel

REFERENCE_OBJECT_VALID = {"key1": "value1", "key2": 1}
REFERENCE_OBJECT_VALID_WITH_EXTRA_KEY = {"key1": "value1", "key2": 1, "key-to-clean": "will-be-removed"}
REFERENCE_OBJECT_VALID_WITH_MISSING_KEY = {"key2": 1}
REFERENCE_OBJECT_VALID_UPDATED = {"key1": "value1-updated", "key2": 2}
REFERENCE_OBJECT_INVALID = {"key1": "value1", "key2": "value2"}
REFERENCE_OBJECT_VALID_JSON = json.dumps(REFERENCE_OBJECT_VALID)
REFERENCE_OBJECT_NESTED_VALID = {"nested_key1": {**REFERENCE_OBJECT_VALID}}
REFERENCE_OBJECT_NESTED_VALID_UPDATED = {"nested_key1": {**REFERENCE_OBJECT_VALID_UPDATED}}

REFERENCE_OBJECT_DOUBLE_NESTED_VALID = {"double_nested_key1": {**REFERENCE_OBJECT_NESTED_VALID}}


class ExampleSchema(BaseModel):
    key1: str
    key2: int


class ExampleDefaultableSchema(BaseModel):
    key1: str = "value1"
    key2: int


class ExampleNestedSchema(BaseModel):
    nested_key1: ExampleSchema


class ExampleDoubleNestedSchema(BaseModel):
    double_nested_key1: ExampleNestedSchema


class ExampleClass(ExampleSchema, InMemoryEntityPydantic):
    pass


class ExampleDefaultableClass(ExampleDefaultableSchema, InMemoryEntityPydantic):
    pass


class ExampleNestedClass(ExampleNestedSchema, InMemoryEntityPydantic):
    @property
    def nested_key1_instance(self) -> ExampleClass:
        return ExampleClass.create(self.nested_key1.model_dump())


class ExampleNestedKeyAsClassInstanceClass(ExampleNestedSchema, InMemoryEntityPydantic):
    nested_key1: ExampleClass


class ExampleDoubleNestedKeyAsClassInstancesClass(ExampleDoubleNestedSchema, InMemoryEntityPydantic):
    double_nested_key1: ExampleNestedKeyAsClassInstanceClass


class SampleEnum(str, Enum):
    VALUE1 = "value1"
    VALUE2 = "value2"


class SampleModelWithEnum(BaseModel):
    type: SampleEnum
    name: str = "test"


class SampleEntityWithEnum(SampleModelWithEnum, InMemoryEntityPydantic):
    pass


class CamelCaseSchema(BaseModel):
    applicationName: str
    applicationVersion: Optional[str] = None
    executableName: Optional[str] = None


class SnakeCaseEntity(CamelCaseSchema, InMemoryEntitySnakeCase):
    pass


SNAKE_CASE_CONFIG = {
    "application_name": "espresso",
    "application_version": "7.2",
    "executable_name": "pw.x",
}

CAMEL_CASE_CONFIG = {
    "applicationName": "espresso",
    "applicationVersion": "7.2",
    "executableName": "pw.x",
}

MIXED_CASE_CONFIG = {
    "application_name": "espresso",
    "applicationVersion": "7.2",
    "executable_name": "pw.x",
}


class AutoSnakeCaseTestSchema(BaseModel):
    contextProviders: list = []
    applicationName: str
    applicationVersion: Optional[str] = None
    executableName: Optional[str] = None


class AutoSnakeCaseTestEntity(AutoSnakeCaseTestSchema, InMemoryEntitySnakeCase):
    pass
