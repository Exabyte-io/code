from mat3ra.code.mixins import DefaultableMixin, NamedMixin


def test_defaultable_mixin():
    # Test the DefaultableMixin functionality
    default_config = {"key": "value", "number": 42}

    class ExampleDefaultable(DefaultableMixin):
        key: str
        number: int

        __default_config__ = default_config

    # Create a default instance
    instance = ExampleDefaultable.create_default()

    assert instance.key == "value"
    assert instance.number == 42
    assert hasattr(instance, "isDefault") and instance.isDefault is True


def test_named_mixin():
    # Test the NamedMixin functionality
    class ExampleNamed(NamedMixin):
        pass

    # Create an instance with a name
    instance = ExampleNamed(name="TestName")

    assert instance.name == "TestName"

    # Test with None
    instance_none = ExampleNamed()
    assert instance_none.name is None
