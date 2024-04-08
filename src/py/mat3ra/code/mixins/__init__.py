from typing import Any, Dict

from .. import BaseUnderscoreJsonPropsHandler


class DefaultableMixin(BaseUnderscoreJsonPropsHandler):
    __default_config__: Dict[str, Any]

    @property
    def is_default(self) -> bool:
        return self.get_prop("isDefault", False)

    @is_default.setter
    def is_default(self, is_default: bool = False) -> None:
        self.set_prop("isDefault", is_default)

    @classmethod
    def create_default(cls) -> "DefaultableMixin":
        return cls(cls.__default_config__)


class NamedMixin(BaseUnderscoreJsonPropsHandler):
    @property
    def name(self) -> str:
        return self.get_prop("name", False)

    @name.setter
    def name(self, name: str = "") -> None:
        self.set_prop("name", name)


class HasMetadataMixin(BaseUnderscoreJsonPropsHandler):
    @property
    def metadata(self) -> Dict:
        return self.get_prop("metadata", False)

    @metadata.setter
    def metadata(self, metadata: Dict = {}) -> None:
        self.set_prop("metadata", metadata)


class HasDescriptionMixin(BaseUnderscoreJsonPropsHandler):
    @property
    def description(self) -> str:
        return self.get_prop("description", "")

    @description.setter
    def description(self, description: str = "") -> None:
        self.set_prop("description", description)

    @property
    def description_object(self) -> str:
        return self.get_prop("descriptionObject", "")

    @description_object.setter
    def description_object(self, description_object: str = "") -> None:
        self.set_prop("descriptionObject", description_object)
