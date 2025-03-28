from typing import Any, Dict, Optional, ClassVar

from mat3ra.esse.models.system.description import DescriptionSchema
from mat3ra.esse.models.system.metadata import MetadataSchema
from pydantic import BaseModel
from mat3ra.esse.models.system.defaultable import DefaultableEntitySchema


class DefaultableMixin(DefaultableEntitySchema):
    __default_config__: ClassVar[Dict[str, Any]] = {}

    @property
    def default_config(self) -> Dict[str, Any]:
        return self.__default_config__

    @classmethod
    def create_default(cls) -> "DefaultablePydanticMixin":
        instance = cls(**cls.__default_config__)
        instance.isDefault = True
        return instance


class NamedMixin(BaseModel):
    name: Optional[str] = None


class HasMetadataMixin(MetadataSchema):
    pass


class HasDescriptionMixin(DescriptionSchema):
    pass
