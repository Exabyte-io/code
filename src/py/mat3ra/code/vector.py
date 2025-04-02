from typing import List

from mat3ra.esse.models.core.abstract.point import PointSchema as Vector3DSchema
from mat3ra.utils.mixins import RoundNumericValuesMixin
from pydantic import model_serializer


class Vector3D(Vector3DSchema):
    def __init__(self, root: List[float]):
        super().__init__(root=root)

    @property
    def value(self):
        return self.root

    @property
    def x(self):
        return self.root[0]

    @property
    def y(self):
        return self.root[1]

    @property
    def z(self):
        return self.root[2]


class RoundedVector3D(RoundNumericValuesMixin, Vector3D):
    def __init__(self, root: List[float]):
        super().__init__(root=root)

    @model_serializer
    def to_dict(self, skip_rounding: bool = False) -> List[float]:
        rounded_value = self.round_array_or_number(self.root) if not skip_rounding else self.root
        return Vector3D(root=rounded_value).model_dump()

    @property
    def value_rounded(self):
        return self.to_dict()

    @property
    def x_rounded(self):
        return self.value_rounded[0]

    @property
    def y_rounded(self):
        return self.value_rounded[1]

    @property
    def z_rounded(self):
        return self.value_rounded[2]
