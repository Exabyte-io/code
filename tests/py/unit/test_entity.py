import json

from mat3ra.code.entity import InMemoryEntityPydantic
from pydantic import BaseModel

REFERENCE_OBJECT_VALID = {"key1": "value1", "key2": 1}
REFERENCE_OBJECT_INVALID = {"key1": "value1", "key2": "value2"}
REFERENCE_OBJECT_VALID_JSON = json.dumps(REFERENCE_OBJECT_VALID)
REFERENCE_OBJECT_NESTED_VALID = {"nested_key1": {**REFERENCE_OBJECT_VALID}}
REFERENCE_OBJECT_OVERRIDE_VALID = {"as_class_instance": {**REFERENCE_OBJECT_VALID}}


class ExampleSchema(BaseModel):
    key1: str
    key2: int


class ExampleNestedSchema(BaseModel):
    nested_key1: ExampleSchema


class ExampleOverrideSchema(BaseModel):
    as_class_instance: ExampleSchema


class ExampleClass(ExampleSchema, InMemoryEntityPydantic):
    pass


class ExampleNestedClass(ExampleNestedSchema, InMemoryEntityPydantic):
    @property
    def nested_key1_instance(self) -> ExampleClass:
        return ExampleClass.create(self.nested_key1.model_dump())


class ExampleFullClass(ExampleOverrideSchema, InMemoryEntityPydantic):
    __default_config__ = REFERENCE_OBJECT_OVERRIDE_VALID

    # We override the as_class_instance field to be an instance of ExampleClass
    as_class_instance: ExampleClass = ExampleClass(**REFERENCE_OBJECT_VALID)


def test_create():
    in_memory_entity = ExampleClass.create(REFERENCE_OBJECT_VALID)
    assert isinstance(in_memory_entity, ExampleClass)
    assert in_memory_entity.key1 == "value1"
    assert in_memory_entity.key2 == 1


def test_create_nested():
    # Test creating an instance with nested valid data
    in_memory_entity = ExampleNestedClass.create(REFERENCE_OBJECT_NESTED_VALID)
    assert isinstance(in_memory_entity, ExampleNestedClass)
    assert isinstance(in_memory_entity.nested_key1, ExampleSchema)
    assert in_memory_entity.nested_key1.key1 == "value1"
    assert in_memory_entity.nested_key1.key2 == 1
    assert isinstance(in_memory_entity.nested_key1_instance, ExampleClass)


def test_full_class():
    in_memory_entity = ExampleFullClass.create(REFERENCE_OBJECT_OVERRIDE_VALID)
    assert isinstance(in_memory_entity, ExampleFullClass)
    assert isinstance(in_memory_entity.as_class_instance, ExampleClass)
    assert in_memory_entity.as_class_instance.key1 == "value1"
    assert in_memory_entity.as_class_instance.key2 == 1
    assert in_memory_entity.get_data_model() == ExampleOverrideSchema


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


def test_is_valid():
    assert ExampleClass.is_valid(REFERENCE_OBJECT_VALID) is True
    assert ExampleClass.is_valid(REFERENCE_OBJECT_INVALID) is False


def test_from_json():
    # Test from_json method with valid JSON
    in_memory_entity = ExampleClass.from_json(REFERENCE_OBJECT_VALID_JSON)
    assert isinstance(in_memory_entity, ExampleClass)
    assert in_memory_entity.key1 == "value1"
    assert in_memory_entity.key2 == 1

    # Test from_json with invalid JSON
    try:
        _ = ExampleClass.from_json(json.dumps(REFERENCE_OBJECT_INVALID))
        assert False, "Invalid JSON did not raise an exception"
    except Exception:
        assert True  # Expecting an exception for invalid JSON


def test_clean():
    # Test clean method with valid input
    cleaned_data = ExampleClass.clean(REFERENCE_OBJECT_VALID)
    assert isinstance(cleaned_data, dict)
    assert cleaned_data == REFERENCE_OBJECT_VALID

    # Test clean method with invalid input
    try:
        _ = ExampleClass.clean(REFERENCE_OBJECT_INVALID)
        assert False, "Invalid input did not raise an exception"
    except Exception:
        assert True  # Expecting an exception for invalid input


def test_get_cls_name():
    # Test get_cls_name method
    entity = ExampleClass.create(REFERENCE_OBJECT_VALID)
    cls_name = entity.get_cls_name()
    assert cls_name == "ExampleClass", f"Expected 'ExampleClass', got '{cls_name}'"
    # Ensure it works for the class itself
    assert ExampleClass.__name__ == "ExampleClass"


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


def test_clone():
    entity = ExampleClass.create(REFERENCE_OBJECT_VALID)
    # Test clone method
    cloned_entity = entity.clone()
    assert isinstance(cloned_entity, ExampleClass)
    assert cloned_entity.key1 == entity.key1
    assert cloned_entity.key2 == entity.key2

    # Test clone with extra context
    extra_context = {"key2": 2}
    cloned_entity_with_extra = entity.clone(extra_context=extra_context)
    assert isinstance(cloned_entity_with_extra, ExampleClass)
    assert cloned_entity_with_extra.key1 == entity.key1
    assert cloned_entity_with_extra.key2 == 2  # Should override to 2
