from mat3ra.code.entity import InMemoryEntity

REFERENCE_OBJECT_1 = {"key1": "value1", "key2": "value2"}

class ChildClass(InMemoryEntity):
    key1: str
    key2: str

child_object = ChildClass(**REFERENCE_OBJECT_1)

def test_create():
    in_memory_entity = InMemoryEntity.create({})
    assert isinstance(in_memory_entity, InMemoryEntity)


def test_subclass_fields():
    assert child_object.key1 == "value1"
    assert child_object.key2 == "value2"


def test_to_dict():
    entity = child_object.create(REFERENCE_OBJECT_1)
    assert entity.to_dict() == REFERENCE_OBJECT_1


def test_to_json():
    entity = child_object.create(REFERENCE_OBJECT_1)
    assert entity.to_json() == '{"key1":"value1","key2":"value2"}'
