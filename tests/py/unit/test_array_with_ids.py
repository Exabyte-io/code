import json

import numpy as np
from mat3ra.code.array_with_ids import ArrayWithIds, RoundedArrayWithIds

ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG = {"values": [1, 2, 3], "ids": [0, 1, 2]}

ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_DICT_OUTPUT = [
    {"id": 0, "value": 1},
    {"id": 1, "value": 2},
    {"id": 2, "value": 3},
]

ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_JSON_OUTPUT = json.dumps(ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_DICT_OUTPUT)

ARRAY_WITH_IDS_ARRAY_VALUES_CONFIG = {"values": [[1, 2], [3, 4], [5, 6]], "ids": [0, 1, 2]}

ARRAY_WITH_IDS_ARRAY_VALUES_CONFIG_TO_DICT_OUTPUT = [
    {"id": 0, "value": [1, 2]},
    {"id": 1, "value": [3, 4]},
    {"id": 2, "value": [5, 6]},
]

ARRAY_WITH_IDS_ARRAY_VALUES_CONFIG_TO_JSON_OUTPUT = json.dumps(ARRAY_WITH_IDS_ARRAY_VALUES_CONFIG_TO_DICT_OUTPUT)

ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG = {
    "values": [[1.23456789, 2.3456789], [3.456789, 4.56789], [-5.6789, 0.0000006789]],
    "ids": [0, 1, 2],
}

ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT = [
    {"id": 0, "value": [1.23456789, 2.3456789]},
    {"id": 1, "value": [3.456789, 4.56789]},
    {"id": 2, "value": [-5.6789, 0.0000006789]},
]

ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_JSON_OUTPUT = json.dumps(
    ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT
)

ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_NON_CONSECUTIVE = {
    "values": [[1.23456789, 2.3456789], [3.456789, 4.56789], [-5.6789, 0.0000006789]],
    "ids": [2, 4, 6],
}

ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_NON_CONSECUTIVE_TO_DICT_OUTPUT = [
    {"id": 2, "value": [1.23456789, 2.3456789]},
    {"id": 4, "value": [3.456789, 4.56789]},
    {"id": 6, "value": [-5.6789, 0.0000006789]},
]

ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_NON_CONSECUTIVE_TO_JSON_OUTPUT = json.dumps(
    ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_NON_CONSECUTIVE_TO_DICT_OUTPUT
)

ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT_ROUNDED = [
    {"id": 0, "value": [1.235, 2.346]},
    {"id": 1, "value": [3.457, 4.568]},
    {"id": 2, "value": [-5.679, 0.0]},
]

ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT_ROUNDED_JSON = json.dumps(
    ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT_ROUNDED
)

ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT_ROUNDED_WITH_ADDITION_OF_ONE = [
    {"id": 0, "value": [2.235, 3.346]},
    {"id": 1, "value": [4.457, 5.568]},
    {"id": 2, "value": [-4.679, 1.0]},
]

ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT_ROUNDED_WITH_ADDITION_OF_ONE_JSON = json.dumps(
    ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT_ROUNDED_WITH_ADDITION_OF_ONE
)


def test_create_integers():
    instance = ArrayWithIds(**ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG)
    assert instance.values == ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG["values"]
    assert instance.ids == ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG["ids"]
    assert instance.to_dict() == ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_DICT_OUTPUT
    assert instance.to_json() == ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_JSON_OUTPUT


def test_create_array_values():
    instance = ArrayWithIds(**ARRAY_WITH_IDS_ARRAY_VALUES_CONFIG)
    assert instance.values == ARRAY_WITH_IDS_ARRAY_VALUES_CONFIG["values"]
    assert instance.ids == ARRAY_WITH_IDS_ARRAY_VALUES_CONFIG["ids"]
    assert instance.to_dict() == ARRAY_WITH_IDS_ARRAY_VALUES_CONFIG_TO_DICT_OUTPUT
    assert instance.to_json() == ARRAY_WITH_IDS_ARRAY_VALUES_CONFIG_TO_JSON_OUTPUT


def test_create_arrays_of_float_values():
    instance = ArrayWithIds(**ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG)
    assert instance.values == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"]
    assert instance.ids == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["ids"]
    assert instance.to_dict() == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT
    assert instance.to_json() == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_JSON_OUTPUT


def test_create_arrays_of_float_values_rounded():
    local_ = RoundedArrayWithIds
    local_.__round_precision__ = 3
    instance = local_(**ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG)
    assert instance.values == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"]
    assert instance.ids == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["ids"]
    assert instance.to_dict() == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT_ROUNDED
    assert instance.to_json() == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT_ROUNDED_JSON


def test_from_values():
    instance = ArrayWithIds.from_values(ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"])
    assert instance.values == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"]
    assert instance.ids == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["ids"]
    assert instance.to_dict() == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT
    assert instance.to_json() == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_JSON_OUTPUT


def test_from_list_of_dicts():
    instance = ArrayWithIds.from_list_of_dicts(ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT)
    assert instance.values == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"]
    assert instance.ids == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["ids"]
    assert instance.to_dict() == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT
    assert instance.to_json() == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_JSON_OUTPUT


def test_from_list_of_dicts_non_consecutive():
    instance = ArrayWithIds.from_list_of_dicts(
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_NON_CONSECUTIVE_TO_DICT_OUTPUT
    )
    assert instance.values == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_NON_CONSECUTIVE["values"]
    assert instance.ids == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_NON_CONSECUTIVE["ids"]
    assert instance.to_dict() == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_NON_CONSECUTIVE_TO_DICT_OUTPUT
    assert instance.to_json() == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_NON_CONSECUTIVE_TO_JSON_OUTPUT


def test_filter_by_values():
    instance = ArrayWithIds(**ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG)
    instance.filter_by_values(
        [
            ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"][0],
            ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"][2],
        ]
    )
    assert instance.values == [
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"][0],
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"][2],
    ]
    assert instance.ids == [
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["ids"][0],
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["ids"][2],
    ]
    assert instance.to_dict() == [
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[0],
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[2],
    ]
    assert instance.to_json() == json.dumps(
        [
            ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[0],
            ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[2],
        ]
    )


def test_filter_by_indices():
    instance = ArrayWithIds(**ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG)
    instance.filter_by_indices([0, 2])
    assert instance.values == [
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"][0],
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"][2],
    ]
    assert instance.ids == [
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["ids"][0],
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["ids"][2],
    ]
    assert instance.to_dict() == [
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[0],
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[2],
    ]
    assert instance.to_json() == json.dumps(
        [
            ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[0],
            ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[2],
        ]
    )


def test_filter_by_ids():
    instance = ArrayWithIds(**ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG)
    instance.filter_by_ids([0, 2])
    assert instance.values == [
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"][0],
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"][2],
    ]
    assert instance.ids == [
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["ids"][0],
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["ids"][2],
    ]
    assert instance.to_dict() == [
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[0],
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[2],
    ]
    assert instance.to_json() == json.dumps(
        [
            ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[0],
            ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[2],
        ]
    )


def test_filter_by_ids_invert():
    instance = ArrayWithIds(**ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG)
    instance.filter_by_ids([0, 2], invert=True)
    assert instance.values == [
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["values"][1],
    ]
    assert instance.ids == [
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG["ids"][1],
    ]
    assert instance.to_dict() == [
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[1],
    ]
    assert instance.to_json() == json.dumps(
        [
            ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT[1],
        ]
    )


def test_map_array_in_place_rounded():
    def add_one_to_each_element(value):
        return [float(np.round(v + 1.0, decimals=3)) for v in value]

    instance = RoundedArrayWithIds(**ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG)
    instance.map_array_in_place(add_one_to_each_element)

    assert instance.values == [
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT_ROUNDED_WITH_ADDITION_OF_ONE[0]["value"],
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT_ROUNDED_WITH_ADDITION_OF_ONE[1]["value"],
        ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT_ROUNDED_WITH_ADDITION_OF_ONE[2]["value"],
    ]
    assert instance.ids == [0, 1, 2]
    assert (
        instance.to_dict() == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT_ROUNDED_WITH_ADDITION_OF_ONE
    )
    assert (
        instance.to_json()
        == ARRAY_WITH_IDS_ARRAYS_OF_FLOAT_VALUES_CONFIG_TO_DICT_OUTPUT_ROUNDED_WITH_ADDITION_OF_ONE_JSON
    )


def test_add_item():
    instance = ArrayWithIds(**ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG)
    instance.add_item(4)
    assert instance.values == [1, 2, 3, 4]
    assert instance.ids == [0, 1, 2, 3]
    assert instance.to_dict() == ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_DICT_OUTPUT + [{"id": 3, "value": 4}]
    assert instance.to_json() == json.dumps(
        ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_DICT_OUTPUT + [{"id": 3, "value": 4}]
    )

    instance.add_item(5, 5)
    assert instance.values == [1, 2, 3, 4, 5]
    assert instance.ids == [0, 1, 2, 3, 5]
    assert instance.to_dict() == ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_DICT_OUTPUT + [
        {"id": 3, "value": 4},
        {"id": 5, "value": 5},
    ]
    assert instance.to_json() == json.dumps(
        ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_DICT_OUTPUT + [{"id": 3, "value": 4}] + [{"id": 5, "value": 5}]
    )


def test_remove_item():
    instance = ArrayWithIds(**ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG)
    instance.remove_item(1)
    assert instance.values == [1, 3]
    assert instance.ids == [0, 2]
    assert instance.to_dict() == [
        ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_DICT_OUTPUT[0],
        ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_DICT_OUTPUT[2],
    ]
    assert instance.to_json() == json.dumps(
        [ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_DICT_OUTPUT[0], ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_DICT_OUTPUT[2]]
    )

    instance.remove_item(0, 0)
    assert instance.values == [3]
    assert instance.ids == [2]
    assert instance.to_dict() == [ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_DICT_OUTPUT[2]]
    assert instance.to_json() == json.dumps([ARRAY_WITH_IDS_INTEGER_VALUES_CONFIG_TO_DICT_OUTPUT[2]])
