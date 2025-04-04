import json
from typing import Any, Callable, Dict, List, Optional, Tuple, Union

from mat3ra.utils.mixins import RoundNumericValuesMixin
from pydantic import BaseModel, model_serializer

from .value_with_id import RoundedValueWithId, ValueWithId


class ArrayWithIds(BaseModel):
    values: List[Any]
    ids: List[int]

    @classmethod
    def from_values(cls, values: List[Any]) -> "ArrayWithIds":
        try:
            ids = list(range(len(values)))
            return cls(values=values, ids=ids)
        except KeyError:
            raise ValueError("Values must be a list")

    @classmethod
    def get_values_and_ids_from_list_of_dicts(cls, list_of_dicts: List[Dict[str, Any]]) -> Tuple[List[Any], List[int]]:
        try:
            values = [item["value"] for item in list_of_dicts]
            ids = [item["id"] for item in list_of_dicts]
            return values, ids
        except KeyError:
            raise ValueError("List of dictionaries must contain 'id' and 'value' keys")

    @classmethod
    def from_list_of_dicts(cls, list_of_dicts: List[Dict[str, Any]]) -> "ArrayWithIds":
        try:
            values, ids = cls.get_values_and_ids_from_list_of_dicts(list_of_dicts)
            return cls(values=values, ids=ids)
        except KeyError:
            raise ValueError("List of dictionaries must contain 'id' and 'value' keys")

    @model_serializer
    def to_dict(self) -> List[Dict[str, Any]]:
        return list(map(lambda x: x.to_dict(), self.to_array_of_values_with_ids()))

    def to_json(self, skip_rounding=True) -> str:
        return json.dumps(self.to_dict())

    def to_array_of_values_with_ids(self) -> List[ValueWithId]:
        return [ValueWithId(id=id, value=item) for id, item in zip(self.ids, self.values)]

    def get_element_value_by_index(self, index: int) -> Any:
        return self.values[index] if index < len(self.values) else None

    def get_element_id_by_value(self, value: Any) -> Optional[int]:
        try:
            return self.ids[self.values.index(value)]
        except ValueError:
            return None

    def filter_by_values(self, values: Union[List[Any], Any]):
        def make_hashable(value):
            return tuple(value) if isinstance(value, list) else value

        values_to_keep = set(make_hashable(v) for v in values) if isinstance(values, list) else {make_hashable(values)}
        filtered_items = [(v, i) for v, i in zip(self.values, self.ids) if make_hashable(v) in values_to_keep]
        if filtered_items:
            values_unpacked, ids_unpacked = zip(*filtered_items)
            self.values = list(values_unpacked)
            self.ids = list(ids_unpacked)
        else:
            self.values = []
            self.ids = []

    def filter_by_indices(self, indices: Union[List[int], int]):
        index_set = set(indices) if isinstance(indices, list) else {indices}
        self.values = [self.values[i] for i in range(len(self.values)) if i in index_set]
        self.ids = [self.ids[i] for i in range(len(self.ids)) if i in index_set]

    def filter_by_ids(self, ids: Union[List[int], int], invert: bool = False):
        if isinstance(ids, int):
            ids = [ids]
        if not invert:
            ids_set = set(ids)
        else:
            ids_set = set(self.ids) - set(ids)
        keep_indices = [index for index, id_ in enumerate(self.ids) if id_ in ids_set]
        self.values = [self.values[index] for index in keep_indices]
        self.ids = [self.ids[index] for index in keep_indices]

    def __eq__(self, other: object) -> bool:
        return isinstance(other, ArrayWithIds) and self.values == other.values and self.ids == other.ids

    def map_array_in_place(self, func: Callable):
        self.values = list(map(func, self.values))

    def add_item(self, element: Any, id: Optional[int] = None):
        if id is None:
            new_id = max(self.ids, default=-1) + 1
        else:
            new_id = id
        self.values.append(element)
        self.ids.append(new_id)

    def remove_item(self, index: int, id: Optional[int] = None):
        if id is not None:
            try:
                index = self.ids.index(id)
            except ValueError:
                raise ValueError("ID not found in the list")
        if index < len(self.values):
            del self.values[index]
            del self.ids[index]
        else:
            raise IndexError("Index out of range")


class RoundedArrayWithIds(RoundNumericValuesMixin, ArrayWithIds):
    def to_array_of_values_with_ids(self) -> List[ValueWithId]:
        class_reference = RoundedValueWithId
        class_reference.__round_precision__ = self.__round_precision__
        return [class_reference(id=id, value=item) for id, item in zip(self.ids, self.values)]
