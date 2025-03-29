from typing import Any, ClassVar, Dict, Optional

from mat3ra.esse.models.system.defaultable import DefaultableEntitySchema
from mat3ra.esse.models.system.description import DescriptionSchema
from mat3ra.esse.models.system.metadata import MetadataSchema
from mat3ra.esse.models.system.name import NameEntitySchema
from pydantic import BaseModel


class DefaultableMixin(DefaultableEntitySchema):
    __default_config__: ClassVar[Dict[str, Any]] = {}

    @property
    def default_config(self) -> Dict[str, Any]:
        return self.__default_config__

    @classmethod
    def create_default(cls) -> "DefaultableMixin":
        instance = cls(**cls.__default_config__)
        instance.isDefault = True
        return instance


class NamedMixin(NameEntitySchema):
    pass


class HasMetadataMixin(MetadataSchema):
    pass


class HasDescriptionMixin(DescriptionSchema):
    pass
