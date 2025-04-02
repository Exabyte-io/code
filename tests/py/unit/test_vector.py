from mat3ra.code.vector import RoundedVector3D, Vector3D

VECTOR_FLOAT = [1.234567890, 2.345678901, 3.456789012]
VECTOR_FLOAT_ROUNDED_4 = [1.2346, 2.3457, 3.4568]
VECTOR_FLOAT_ROUNDED_3 = [1.235, 2.346, 3.457]


def test_vector_init():
    vector = Vector3D(root=VECTOR_FLOAT)
    assert vector.model_dump() == VECTOR_FLOAT


def test_vector_init_wrong_type():
    try:
        _ = Vector3D(root=[1, 2, "3"])
    except Exception as e:
        assert str(e) == "3 is not of type float"


def test_vector_init_wrong_size():
    try:
        _ = Vector3D(root=[1, 2])
        assert False
    except Exception:
        assert True


def test_rounded_vector_serialization():
    class_reference = RoundedVector3D
    class_reference.__round_precision__ = 4
    vector = class_reference(root=VECTOR_FLOAT)
    assert vector.model_dump() == VECTOR_FLOAT_ROUNDED_4
    assert vector.value_rounded == VECTOR_FLOAT_ROUNDED_4
    assert vector.value == VECTOR_FLOAT

    class_reference = RoundedVector3D
    class_reference.__round_precision__ = 3
    vector = class_reference(root=VECTOR_FLOAT)
    assert vector.model_dump() == VECTOR_FLOAT_ROUNDED_3
    assert vector.value_rounded == VECTOR_FLOAT_ROUNDED_3
    assert vector.value == VECTOR_FLOAT
