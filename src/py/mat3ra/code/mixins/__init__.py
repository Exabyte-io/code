from typing import Any, ClassVar, Dict, Optional

from mat3ra.esse.models.system.defaultable import DefaultableEntitySchema
from mat3ra.esse.models.system.description import DescriptionSchema
from mat3ra.esse.models.system.metadata import MetadataSchema
from mat3ra.esse.models.system.name import NameEntitySchema


class DefaultableMixin(DefaultableEntitySchema):
    __default_config__: ClassVar[Dict[str, Any]] = {}

    @classmethod
    def create_default(cls) -> "DefaultableMixin":
        return cls(**cls.__default_config__)


class NamedMixin(NameEntitySchema):
    pass


class HasMetadataMixin(MetadataSchema):
    pass


class HasDescriptionMixin(DescriptionSchema):
    pass
