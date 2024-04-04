from mat3ra.code.entity import InMemoryEntity

REFERENCE_OBJECT_1 = {"key1": "value1", "key2": "value2"}


def test_create():
    in_memory_entity = InMemoryEntity.create({})
    assert isinstance(in_memory_entity, InMemoryEntity)


def test_get_prop():
    in_memory_entity = InMemoryEntity.create(REFERENCE_OBJECT_1)
    assert in_memory_entity.get_prop("key1") == "value1"


def test_set_prop():
    in_memory_entity = InMemoryEntity.create(REFERENCE_OBJECT_1)
    in_memory_entity.set_prop("key3", "value3")
    assert in_memory_entity.get_prop("key3") == "value3"


def test_to_json():
    in_memory_entity = InMemoryEntity.create({})
    assert in_memory_entity.to_json() == {}
