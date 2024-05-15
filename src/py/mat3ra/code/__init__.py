from typing import Any, Dict

from mat3ra.utils import object as object_utils


class BaseUnderscoreJsonPropsHandler(object):
    def __init__(self, config: Dict[str, Any] = {}) -> None:
        self._json = object_utils.clone_deep(config)

    def __getattribute__(self, item):
        try:
            default_attribute = super().__getattribute__(item)
            return default_attribute
        except AttributeError:
            return self.__getattribute_from_json__(item)

    def __getattribute_from_json__(self, name: str, default_value: Any = None) -> Any:
        return self._json.get(name, default_value)

    def get_prop(self, name: str, default_value: Any = None) -> Any:
        return self.__getattribute_from_json__(name, default_value)

    def set_prop(self, name: str, value: Any) -> None:
        object_utils.set_object_key(self._json, name, value)

    def unset_prop(self, name: str) -> None:
        del self._json[name]

    def set_props(self, json: Dict[str, Any] = {}) -> Any:
        for key, value in json.items():
            self.set_prop(key, value)
        return self
