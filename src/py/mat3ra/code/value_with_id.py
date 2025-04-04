import json
from typing import Any, Dict

from mat3ra.utils.mixins import RoundNumericValuesMixin
from pydantic import BaseModel, model_serializer


class ValueWithId(BaseModel):
    id: int = 0
    value: Any = None

    @model_serializer
    def to_dict(self):
        # If `to_dict` is present in `value`, call it
        if hasattr(self.value, "to_dict"):
            return {"id": self.id, "value": self.value.to_dict()}
        else:
            return {"id": self.id, "value": self.value}

    def to_json(self) -> str:
        return json.dumps(self.to_dict())

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, ValueWithId):
            return False
        return self.value == other.value and self.id == other.id


class RoundedValueWithId(RoundNumericValuesMixin, ValueWithId):
    @model_serializer
    def to_dict(self, skip_rounding: bool = False) -> Dict[str, Any]:
        rounded_value = self.round_array_or_number(self.value) if not skip_rounding else self.value
        rounded_value_with_id = ValueWithId(id=self.id, value=rounded_value)
        return rounded_value_with_id.to_dict()
