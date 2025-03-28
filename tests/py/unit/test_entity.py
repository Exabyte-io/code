import json

from mat3ra.code.entity import InMemoryEntityPydantic
from pydantic import BaseModel

REFERENCE_OBJECT_VALID = {"key1": "value1", "key2": 1}
REFERENCE_OBJECT_INVALID = {"key1": "value1", "key2": "value2"}
REFERENCE_OBJECT_VALID_JSON = json.dumps(REFERENCE_OBJECT_VALID)


class ExampleSchema(BaseModel):
    key1: str
    key2: int


class ExampleClass(ExampleSchema, InMemoryEntityPydantic):
    pass


example_class_instance_valid = ExampleClass(**REFERENCE_OBJECT_VALID)


def test_create():
    in_memory_entity = ExampleClass.create(REFERENCE_OBJECT_VALID)
    assert isinstance(in_memory_entity, ExampleClass)
    assert in_memory_entity.key1 == "value1"
    assert in_memory_entity.key2 == 1


def test_validate():
    # Test valid case
    in_memory_entity = ExampleClass.create(REFERENCE_OBJECT_VALID)
    assert isinstance(in_memory_entity, ExampleClass)
    # Test invalid case
    try:
        _ = ExampleClass.create(REFERENCE_OBJECT_INVALID)
        assert False, "Invalid input did not raise an exception"
    except Exception:
        assert True  # Expecting an exception for invalid input


def test_to_dict():
    entity = ExampleClass.create(REFERENCE_OBJECT_VALID)
    # Test to_dict method
    result = entity.to_dict()
    assert isinstance(result, dict)
    assert result == {"key1": "value1", "key2": 1}
    # Test with exclude
    result_exclude = entity.to_dict(exclude=["key2"])
    assert result_exclude == {"key1": "value1"}


def test_to_json():
    entity = ExampleClass.create(REFERENCE_OBJECT_VALID)

    result = entity.to_json()
    assert isinstance(result, str)
    assert json.loads(result) == json.loads(REFERENCE_OBJECT_VALID_JSON)
