from typing import List

import numpy as np
from mat3ra.esse.models.core.abstract.vector_3d import Vector3dSchema as Vector3DSchema
from mat3ra.utils.mixins import RoundNumericValuesMixin
from pydantic import model_serializer


class Vector3D(Vector3DSchema):
    __atol__ = 1e-8

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

    def __eq__(self, other):
        if isinstance(other, list):
            other = Vector3D(other)
        return np.allclose(self.root, other.root, atol=self.__atol__, rtol=0)

    @property
    def norm(self):
        return np.linalg.norm(self.value)


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

    def __eq__(self, other):
        if isinstance(other, list):
            other = RoundedVector3D(other)
        atol = self.__atol__ or 10 ** (-self.__round_precision__)
        return np.allclose(self.value_rounded, other.value_rounded, atol=atol, rtol=0)

    @property
    def norm_rounded(self):
        return self.round_array_or_number(self.norm)
