from typing import Any, Dict, Optional

from mat3ra.esse.models.system.description import DescriptionSchema
from mat3ra.esse.models.system.metadata import MetadataSchema
from pydantic import BaseModel
from mat3ra.esse.models.system.defaultable import DefaultableEntitySchema


class DefaultableMixin(DefaultableEntitySchema):
    __default_config__: [Dict[str, Any]] = {}

    @classmethod
    def create_default(cls) -> "DefaultableMixin":
        return cls.model_validate(cls.__default_config__)


class NamedMixin(BaseModel):
    name: Optional[str] = None


class HasMetadataMixin(MetadataSchema):
    pass


class HasDescriptionMixin(DescriptionSchema):
    pass
