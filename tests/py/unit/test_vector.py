import numpy as np
from mat3ra.code.vector import RoundedVector3D, Vector3D

VECTOR_FLOAT = [1.234567890, 2.345678901, 3.456789012]
VECTOR_FLOAT_NORM = 4.3561172682906
FLOAT_PRECISION = 1e-8

VECTOR_FLOAT_DIFFERENT_WITHIN_TOL = [1.23456789999, 2.345678901, 3.456789012]
VECTOR_FLOAT_DIFFERENT_OUTSIDE_TOL = [1.2345699999, 2.345678901, 3.456789012]
VECTOR_FLOAT_ROUNDED_4 = [1.2346, 2.3457, 3.4568]
VECTOR_FLOAT_ROUNDED_3 = [1.235, 2.346, 3.457]


def test_vector_init():
    vector = Vector3D(VECTOR_FLOAT)
    assert vector.model_dump() == VECTOR_FLOAT
    assert vector.value == VECTOR_FLOAT
    assert vector.x == 1.234567890
    assert vector.y == 2.345678901
    assert vector.z == 3.456789012


def test_vector_init_wrong_type():
    try:
        _ = Vector3D(root=[1, 2, "3"])
    except Exception as e:
        assert str(e) == "3 is not of type float"


def test_vector_init_wrong_size():
    try:
        _ = Vector3D([1, 2])
        assert False
    except Exception:
        assert True


def test_vector_equality():
    vector = Vector3D(VECTOR_FLOAT)
    assert vector == VECTOR_FLOAT
    assert vector == Vector3D(VECTOR_FLOAT_DIFFERENT_WITHIN_TOL)
    assert vector != Vector3D(VECTOR_FLOAT_DIFFERENT_OUTSIDE_TOL)


def test_vector_equality_with_list():
    vector = Vector3D(VECTOR_FLOAT)
    assert vector == VECTOR_FLOAT
    assert vector == VECTOR_FLOAT_DIFFERENT_WITHIN_TOL
    assert vector != VECTOR_FLOAT_DIFFERENT_OUTSIDE_TOL


def test_vector_norm():
    vector = Vector3D(VECTOR_FLOAT)
    # Check if the norm is close to the expected value to avoid architecture-specific issues
    np.isclose(vector.norm, VECTOR_FLOAT_NORM, atol=FLOAT_PRECISION, rtol=0)
    assert vector.value == VECTOR_FLOAT
    assert vector.x == 1.234567890
    assert vector.y == 2.345678901
    assert vector.z == 3.456789012


#####################################################################
##      RoundedVector3D tests
#####################################################################


def test_rounded_vector_init():
    vector = RoundedVector3D(VECTOR_FLOAT)
    assert vector.model_dump() == VECTOR_FLOAT
    assert vector.value == VECTOR_FLOAT


def test_rounded_vector_serialization():
    class_reference = RoundedVector3D
    class_reference.__round_precision__ = 4
    vector = class_reference(VECTOR_FLOAT)
    assert vector.model_dump() == VECTOR_FLOAT_ROUNDED_4
    assert vector.value_rounded == VECTOR_FLOAT_ROUNDED_4
    assert vector.x == VECTOR_FLOAT[0]
    assert vector.y == VECTOR_FLOAT[1]
    assert vector.z == VECTOR_FLOAT[2]
    assert vector.x_rounded == VECTOR_FLOAT_ROUNDED_4[0]
    assert vector.y_rounded == VECTOR_FLOAT_ROUNDED_4[1]
    assert vector.z_rounded == VECTOR_FLOAT_ROUNDED_4[2]
    assert vector.value == VECTOR_FLOAT

    class_reference = RoundedVector3D
    class_reference.__round_precision__ = 3
    vector = class_reference(VECTOR_FLOAT)
    assert vector.model_dump() == VECTOR_FLOAT_ROUNDED_3
    assert vector.value_rounded == VECTOR_FLOAT_ROUNDED_3
    assert vector.value == VECTOR_FLOAT
    assert vector.x == VECTOR_FLOAT[0]
    assert vector.y == VECTOR_FLOAT[1]
    assert vector.z == VECTOR_FLOAT[2]
    assert vector.x_rounded == VECTOR_FLOAT_ROUNDED_3[0]
    assert vector.y_rounded == VECTOR_FLOAT_ROUNDED_3[1]
    assert vector.z_rounded == VECTOR_FLOAT_ROUNDED_3[2]


def test_rounded_vector_equality():
    class_reference = RoundedVector3D
    # Higher precision yields inequality
    class_reference.__round_precision__ = 4
    vector = class_reference(VECTOR_FLOAT)
    assert vector == VECTOR_FLOAT
    assert vector == VECTOR_FLOAT_ROUNDED_4
    assert vector != VECTOR_FLOAT_ROUNDED_3
    # Lower precision yields equality
    class_reference.__round_precision__ = 3
    vector = class_reference(VECTOR_FLOAT)
    assert vector == VECTOR_FLOAT
    assert vector == VECTOR_FLOAT_ROUNDED_4
    assert vector == VECTOR_FLOAT_ROUNDED_3
