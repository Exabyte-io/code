import json

import pytest
from pydantic import BaseModel, Field

from . import (
    CAMEL_CASE_CONFIG,
    CAMEL_CASE_CONFIG as EXPECTED_CAMEL_CASE_OUTPUT,
    MIXED_CASE_CONFIG,
    REFERENCE_OBJECT_DOUBLE_NESTED_VALID,
    REFERENCE_OBJECT_INVALID,
    REFERENCE_OBJECT_NESTED_VALID,
    REFERENCE_OBJECT_NESTED_VALID_UPDATED,
    REFERENCE_OBJECT_VALID,
    REFERENCE_OBJECT_VALID_JSON,
    REFERENCE_OBJECT_VALID_UPDATED,
    REFERENCE_OBJECT_VALID_WITH_EXTRA_KEY,
    REFERENCE_OBJECT_VALID_WITH_MISSING_KEY,
    SNAKE_CASE_CONFIG,
    ExampleClass,
    ExampleDefaultableClass,
    ExampleDoubleNestedKeyAsClassInstancesClass,
    ExampleDoubleNestedSchema,
    ExampleNestedClass,
    ExampleNestedKeyAsClassInstanceClass,
    ExampleNestedSchema,
    ExampleSchema,
    SampleEnum,
    SampleEntityWithEnum,
    SnakeCaseEntity,
)
from mat3ra.code.entity import InMemoryEntitySnakeCase

ID_ALIAS = "_id"
ID_VALUE = "workflow_1"
EXPECTED_ID_OUTPUT = {ID_ALIAS: ID_VALUE}

BASE_APPLICATION_NAME = "espresso"
KEEP_AS_NONE_APPLICATION_VERSION = ["applicationVersion"]
EXPECTED_DEFAULT_NONE_OUTPUT = {"applicationName": BASE_APPLICATION_NAME}
EXPECTED_KEEP_AS_NONE_OUTPUT = {
    "applicationName": BASE_APPLICATION_NAME,
    "applicationVersion": None,
}

EXAMPLE_ENTITY_EXCLUDE_KEY2 = {"exclude": ["key2"]}
EXAMPLE_ENTITY_EXCLUDE_KEY2_OUTPUT = {"key1": "value1"}

SAMPLE_ENUM_ENTITY_OUTPUT = {"type": "value1", "name": "example"}
TYPE_KEY = "type"

KEEP_AS_NONE_KWARGS = {"keep_as_none": KEEP_AS_NONE_APPLICATION_VERSION}


class BaseIdSchema(BaseModel):
    id: str = Field(alias=ID_ALIAS)


class BaseIdEntity(BaseIdSchema, InMemoryEntitySnakeCase):
    pass


class ChildIdEntity(BaseIdEntity):
    id: str = Field(alias=ID_ALIAS)


def _create_example_entity() -> ExampleClass:
    return ExampleClass.create(REFERENCE_OBJECT_VALID)


def _create_sample_enum_entity() -> SampleEntityWithEnum:
    return SampleEntityWithEnum(type=SampleEnum.VALUE1, name="example")


def _create_base_id_entity() -> BaseIdEntity:
    return BaseIdEntity(**{ID_ALIAS: ID_VALUE})


def _create_child_id_entity() -> ChildIdEntity:
    return ChildIdEntity(**{ID_ALIAS: ID_VALUE})


def _create_snake_case_entity_with_nones() -> SnakeCaseEntity:
    return SnakeCaseEntity(applicationName=BASE_APPLICATION_NAME, applicationVersion=None, executableName=None)


TO_DICT_CASES = [
    (_create_example_entity, {}, {"key1": "value1", "key2": 1}, {}, {}, "example_entity"),
    (_create_example_entity, EXAMPLE_ENTITY_EXCLUDE_KEY2, EXAMPLE_ENTITY_EXCLUDE_KEY2_OUTPUT, {}, {},
     "example_entity_exclude"),
    (_create_sample_enum_entity, {}, SAMPLE_ENUM_ENTITY_OUTPUT, {}, {TYPE_KEY: str}, "enum_entity"),
    (_create_base_id_entity, {}, EXPECTED_ID_OUTPUT, {"id": ID_VALUE}, {}, "base_id_entity"),
    (_create_child_id_entity, {}, EXPECTED_ID_OUTPUT, {"id": ID_VALUE}, {}, "child_id_entity"),
    (_create_snake_case_entity_with_nones, {}, EXPECTED_DEFAULT_NONE_OUTPUT, {}, {}, "snake_case_default_none"),
    (_create_snake_case_entity_with_nones, KEEP_AS_NONE_KWARGS, EXPECTED_KEEP_AS_NONE_OUTPUT, {}, {},
     "snake_case_keep_as_none"),
]

TO_JSON_CASES = [
    (_create_example_entity, {}, json.loads(REFERENCE_OBJECT_VALID_JSON), "example_entity"),
    (_create_base_id_entity, {}, EXPECTED_ID_OUTPUT, "base_id_entity"),
    (_create_child_id_entity, {}, EXPECTED_ID_OUTPUT, "child_id_entity"),
    (_create_snake_case_entity_with_nones, {}, EXPECTED_DEFAULT_NONE_OUTPUT, "snake_case_default_none"),
    (_create_snake_case_entity_with_nones, KEEP_AS_NONE_KWARGS, EXPECTED_KEEP_AS_NONE_OUTPUT,
     "snake_case_keep_as_none"),
]


def test_create():
    entity = ExampleClass.create(REFERENCE_OBJECT_VALID)
    assert isinstance(entity, ExampleClass)
    assert entity.key1 == "value1"
    assert entity.key2 == 1


def test_create_nested():
    # Test creating an instance with nested valid data
    entity = ExampleNestedClass.create(REFERENCE_OBJECT_NESTED_VALID)
    assert isinstance(entity, ExampleNestedClass)
    assert isinstance(entity.nested_key1, ExampleSchema)
    assert entity.nested_key1.key1 == "value1"
    assert entity.nested_key1.key2 == 1
    assert isinstance(entity.nested_key1_instance, ExampleClass)


def test_create_nested_as_class_instance():
    entity = ExampleNestedKeyAsClassInstanceClass.create(REFERENCE_OBJECT_NESTED_VALID)
    assert isinstance(entity, ExampleNestedKeyAsClassInstanceClass)
    assert isinstance(entity.nested_key1, ExampleClass)
    assert entity.nested_key1.key1 == "value1"
    assert entity.nested_key1.key2 == 1
    assert entity.get_data_model() == ExampleNestedSchema


def test_create_double_nested_as_class_instances():
    entity = ExampleDoubleNestedKeyAsClassInstancesClass.create(REFERENCE_OBJECT_DOUBLE_NESTED_VALID)
    assert isinstance(entity, ExampleDoubleNestedKeyAsClassInstancesClass)
    assert isinstance(entity.double_nested_key1, ExampleNestedKeyAsClassInstanceClass)
    assert isinstance(entity.double_nested_key1.nested_key1, ExampleClass)
    assert entity.double_nested_key1.nested_key1.key1 == "value1"
    assert entity.double_nested_key1.nested_key1.key2 == 1
    assert entity.get_data_model() == ExampleDoubleNestedSchema


def test_update_nested_as_class_instance():
    entity = ExampleNestedKeyAsClassInstanceClass.create(REFERENCE_OBJECT_NESTED_VALID)
    entity.nested_key1 = ExampleClass(**REFERENCE_OBJECT_VALID_UPDATED)
    assert entity.nested_key1.key1 == "value1-updated"
    assert entity.nested_key1.key2 == 2
    entity_json = entity.to_json()
    reference_json = json.dumps(REFERENCE_OBJECT_NESTED_VALID_UPDATED)
    assert json.loads(entity_json) == json.loads(reference_json)
    assert isinstance(entity.nested_key1, ExampleClass)


def test_create_with_default():
    entity = ExampleDefaultableClass.create(REFERENCE_OBJECT_VALID_WITH_MISSING_KEY)
    assert isinstance(entity, ExampleDefaultableClass)
    # Default value for key1 -- "value1" is used
    assert entity.key1 == "value1"
    assert entity.key2 == 1
    assert isinstance(entity, ExampleDefaultableClass)


def test_validate():
    # Test valid case
    entity = ExampleClass.create(REFERENCE_OBJECT_VALID)
    assert isinstance(entity, ExampleClass)
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
    entity = ExampleClass.from_json(REFERENCE_OBJECT_VALID_JSON)
    assert isinstance(entity, ExampleClass)
    assert entity.key1 == "value1"
    assert entity.key2 == 1

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


def test_clean_extra_keys():
    # Test clean method with valid input with extra keys
    cleaned_data_with_extra = ExampleClass.clean(REFERENCE_OBJECT_VALID_WITH_EXTRA_KEY)
    assert isinstance(cleaned_data_with_extra, dict)
    assert cleaned_data_with_extra == REFERENCE_OBJECT_VALID
    assert "key-to-clean" not in cleaned_data_with_extra


def test_clean_default_substitution():
    # Test case with default substitution (should add pass and add default values)
    cleaned_data_with_default = ExampleDefaultableClass.clean(REFERENCE_OBJECT_VALID_WITH_MISSING_KEY)
    assert isinstance(cleaned_data_with_default, dict)
    assert cleaned_data_with_default == REFERENCE_OBJECT_VALID

    # Test case with invalid input with missing keys (should raise an error)
    try:
        _ = ExampleDefaultableClass.clean(REFERENCE_OBJECT_INVALID)
        assert False, "Invalid input did not raise an exception"
    except Exception:
        assert True


def test_get_cls_name():
    # Test get_cls_name method
    entity = ExampleClass.create(REFERENCE_OBJECT_VALID)
    cls_name = entity.get_cls_name()
    assert cls_name == "ExampleClass", f"Expected 'ExampleClass', got '{cls_name}'"
    # Ensure it works for the class itself
    assert ExampleClass.__name__ == "ExampleClass"


@pytest.mark.parametrize(
    "entity_factory,to_dict_kwargs,expected_output,expected_attrs,expected_types,_case_id",
    TO_DICT_CASES,
    ids=[case[-1] for case in TO_DICT_CASES],
)
def test_to_dict(entity_factory, to_dict_kwargs, expected_output, expected_attrs, expected_types, _case_id):
    entity = entity_factory()
    result = entity.to_dict(**to_dict_kwargs)
    assert isinstance(result, dict)
    assert result == expected_output

    for attr_name, expected_value in expected_attrs.items():
        assert getattr(entity, attr_name) == expected_value

    for key, expected_type in expected_types.items():
        assert isinstance(result[key], expected_type)


@pytest.mark.parametrize(
    "entity_factory,to_json_kwargs,expected_output,_case_id",
    TO_JSON_CASES,
    ids=[case[-1] for case in TO_JSON_CASES],
)
def test_to_json(entity_factory, to_json_kwargs, expected_output, _case_id):
    entity = entity_factory()
    result = entity.to_json(**to_json_kwargs)
    assert isinstance(result, str)
    assert json.loads(result) == expected_output


def test_clone():
    entity = ExampleClass.create(REFERENCE_OBJECT_VALID)
    # Test clone method
    cloned_entity = entity.clone(deep=False)
    assert isinstance(cloned_entity, ExampleClass)
    assert cloned_entity.key1 == entity.key1
    assert cloned_entity.key2 == entity.key2

    # Test clone with extra context
    extra_context = {"key2": 2}
    cloned_entity_with_extra = entity.clone(extra_context=extra_context, deep=False)
    assert isinstance(cloned_entity_with_extra, ExampleClass)
    assert cloned_entity_with_extra.key1 == entity.key1
    assert cloned_entity_with_extra.key2 == 2  # Should override to 2


def test_clone_deep():
    entity = ExampleClass.create(REFERENCE_OBJECT_VALID)
    # Test clone with deep=True
    cloned_entity_deep = entity.clone(deep=True)
    assert isinstance(cloned_entity_deep, ExampleClass)
    assert cloned_entity_deep.key1 == entity.key1
    assert cloned_entity_deep.key2 == entity.key2

    cloned_entity_deep.key1 = "adjusted_value"
    assert entity.key1 == "value1"
    assert cloned_entity_deep.key1 == "adjusted_value"


@pytest.mark.parametrize(
    "config,expected_output",
    [
        (SNAKE_CASE_CONFIG, EXPECTED_CAMEL_CASE_OUTPUT),
        (CAMEL_CASE_CONFIG, EXPECTED_CAMEL_CASE_OUTPUT),
        (MIXED_CASE_CONFIG, EXPECTED_CAMEL_CASE_OUTPUT),
    ],
)
def test_create_entity_snake_case(config, expected_output):
    entity = SnakeCaseEntity(**config)
    assert entity.applicationName == expected_output["applicationName"]
    assert entity.applicationVersion == expected_output["applicationVersion"]
    assert entity.executableName == expected_output["executableName"]

    result_dict = entity.to_dict()
    assert result_dict == expected_output
    assert "applicationName" in result_dict
    assert "application_name" not in result_dict

    result_json = json.loads(entity.to_json())
    assert result_json == expected_output

    entity_from_create = SnakeCaseEntity.create(config)
    assert entity_from_create.to_dict() == expected_output
