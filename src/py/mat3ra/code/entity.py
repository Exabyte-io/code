import json
from typing import Any, Dict, List, Optional, Type, TypeVar
from mat3ra.utils.object import filter_out_none_values
from pydantic import AliasGenerator, BaseModel, ConfigDict
from pydantic.alias_generators import to_snake
from typing_extensions import Self

from .mixins import DefaultableMixin, HasDescriptionMixin, HasMetadataMixin, NamedMixin

T = TypeVar("T", bound="InMemoryEntityPydantic")
B = TypeVar("B", bound="BaseModel")


class InMemoryEntityPydantic(BaseModel):
    model_config = {"arbitrary_types_allowed": True}

    @classmethod
    def create(cls: Type[T], config: Dict[str, Any]) -> T:
        cleaned_data = cls.clean(config)
        return cls.validate(cleaned_data)

    @classmethod
    def validate(cls, value: Any) -> Self:
        # this will clean and validate data
        return cls.model_validate(value)

    @classmethod
    def is_valid(cls, value: Any) -> bool:
        try:
            cls.validate(value)
            return True
        except Exception:
            return False

    @classmethod
    def from_json(cls: Type[T], json_str: str) -> T:
        return cls.model_validate_json(json_str)

    @classmethod
    def clean(cls: Type[T], config: Dict[str, Any]) -> Dict[str, Any]:
        # Validate the config; extra keys are dropped and defaults are substituted.
        validated = cls.model_validate(config, strict=False)
        return validated.model_dump(mode="json", exclude_unset=False)

    def get_schema(self) -> Dict[str, Any]:
        return self.model_json_schema()

    def get_data_model(self) -> Type[B]:
        for base in self.__class__.__bases__:
            if issubclass(base, BaseModel) and base is not self.__class__:
                return base
        raise ValueError(f"No schema base model found for {self.__class__.__name__}")

    def get_cls_name(self) -> str:
        return self.__class__.__name__

    def to_dict(
            self, exclude: Optional[List[str]] = None, keep_as_none: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        data = self.model_dump(
            mode="json",
            exclude=set(exclude) if exclude else None,
            by_alias=True,
            exclude_none=False,
        )
        return filter_out_none_values(data, keep_as_none=keep_as_none)

    def to_json(self, exclude: Optional[List[str]] = None, keep_as_none: Optional[List[str]] = None) -> str:
        return json.dumps(self.to_dict(exclude=exclude, keep_as_none=keep_as_none))

    def clone(self: T, extra_context: Optional[Dict[str, Any]] = None, deep=True) -> T:
        return self.model_copy(update=extra_context or {}, deep=deep)


class InMemoryEntitySnakeCase(InMemoryEntityPydantic):
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        extra='allow',
        # Generate snake_case aliases for all fields (e.g. myField -> my_field)
        alias_generator=AliasGenerator(validation_alias=to_snake, serialization_alias=lambda field_name: field_name),
        # Allow populating fields using either the original name or the snake_case alias
        populate_by_name=True,
    )

    def __init__(self, **data: Any) -> None:
        """Initialize with explicit **data to avoid parameter ordering issues in multiple inheritance."""
        super().__init__(**data)

    @staticmethod
    def _create_property_from_camel_case(camel_name: str):
        def getter(self):
            return getattr(self, camel_name)

        def setter(self, value: Any):
            setattr(self, camel_name, value)

        return property(getter, setter)

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        if not issubclass(cls, BaseModel):
            return

        try:
            model_fields = cls.model_fields
        except Exception:
            return

        for field_name, field_info in model_fields.items():
            if field_name == to_snake(field_name):
                continue

            snake_case_name = to_snake(field_name)
            if hasattr(cls, snake_case_name):
                continue

            setattr(cls, snake_case_name, cls._create_property_from_camel_case(field_name))


class HasDescriptionHasMetadataNamedDefaultableInMemoryEntityPydantic(
    InMemoryEntityPydantic, DefaultableMixin, NamedMixin, HasMetadataMixin, HasDescriptionMixin
):
    pass
