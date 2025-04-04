from mat3ra.code.value_with_id import RoundedValueWithId, ValueWithId

EXAMPLE_VALUE_WITH_ID_DICT = {"id": 1, "value": "value"}

EXAMPLE_VALUE_WITH_ID_JSON = '{"id": 1, "value": "value"}'

EXAMPLE_VALUE_WITH_ID_DICT_FLOAT = {"id": 1, "value": 1.23456789}

EXAMPLE_VALUE_WITH_ID_DICT_FLOAT_JSON = '{"id": 1, "value": 1.23456789}'

EXAMPLE_VALUE_WITH_ID_DICT_FLOAT_ROUNDED_JSON = '{"id": 1, "value": 1.235}'


def test_create():
    instance = ValueWithId(**EXAMPLE_VALUE_WITH_ID_DICT)
    assert instance.id == EXAMPLE_VALUE_WITH_ID_DICT["id"]
    assert instance.value == EXAMPLE_VALUE_WITH_ID_DICT["value"]
    assert instance.to_dict() == EXAMPLE_VALUE_WITH_ID_DICT


def test_to_json():
    instance = ValueWithId(**EXAMPLE_VALUE_WITH_ID_DICT)
    assert instance.to_json() == EXAMPLE_VALUE_WITH_ID_JSON


def test_create_float():
    instance = ValueWithId(**EXAMPLE_VALUE_WITH_ID_DICT_FLOAT)
    assert instance.id == EXAMPLE_VALUE_WITH_ID_DICT_FLOAT["id"]
    assert instance.value == EXAMPLE_VALUE_WITH_ID_DICT_FLOAT["value"]
    assert instance.to_dict() == EXAMPLE_VALUE_WITH_ID_DICT_FLOAT


def test_create_float_with_precision():
    local_ = RoundedValueWithId
    local_.__round_precision__ = 3
    instance = local_(**EXAMPLE_VALUE_WITH_ID_DICT_FLOAT)
    assert instance.id == EXAMPLE_VALUE_WITH_ID_DICT_FLOAT["id"]
    assert instance.value == EXAMPLE_VALUE_WITH_ID_DICT_FLOAT["value"]
    assert instance.to_json() == EXAMPLE_VALUE_WITH_ID_DICT_FLOAT_ROUNDED_JSON
