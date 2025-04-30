import { Vector3DSchema } from "@mat3ra/esse/dist/js/types";

import { math } from "./math";

export class Vector3D {
    static atol = 1e-8;

    private _value: Vector3DSchema;

    constructor(value: number[] | Vector3DSchema) {
        if (
            !Array.isArray(value) ||
            value.length !== 3 ||
            !value.every((v) => typeof v === "number")
        ) {
            throw new Error("Vector3D must be a tuple of exactly 3 numbers.");
        }
        this._value = [...value] as Vector3DSchema;
    }

    get value(): Vector3DSchema {
        return this._value;
    }

    get x(): number {
        return this._value[0];
    }

    get y(): number {
        return this._value[1];
    }

    get z(): number {
        return this._value[2];
    }

    equals(other: number[] | Vector3DSchema | Vector3D): boolean {
        if (Array.isArray(other)) {
            if (other.length !== 3) {
                throw new Error("Input must be a 3-element array.");
            }
            other = other as Vector3DSchema;
        }
        const arr1 = this._value;
        const arr2 = other instanceof Vector3D ? other.value : other;
        return math.vEqualWithTolerance(arr1, arr2, Vector3D.atol);
    }

    get norm(): number {
        return math.vlen(this._value);
    }

    translateByVector(vector: Vector3DSchema | Vector3D): Vector3D {
        const arrayOfNumbers = vector instanceof Vector3D ? vector.value : vector;
        this._value = this._value.map((v, i) => v + arrayOfNumbers[i]) as Vector3DSchema;
        return this;
    }
}

export class RoundedVector3D extends Vector3D {
    static roundPrecision = 9;

    toJSON(skipRounding = false): Vector3DSchema {
        const rounded = skipRounding
            ? this.value
            : (math.roundArrayOrNumber(
                  this.value,
                  RoundedVector3D.roundPrecision,
              ) as Vector3DSchema);
        return [...rounded] as Vector3DSchema;
    }

    get valueRounded(): Vector3DSchema {
        return this.toJSON();
    }

    get xRounded(): number {
        return this.valueRounded[0];
    }

    get yRounded(): number {
        return this.valueRounded[1];
    }

    get zRounded(): number {
        return this.valueRounded[2];
    }

    override equals(other: Vector3DSchema | RoundedVector3D): boolean {
        const arr1 = this.valueRounded;
        const arr2 = Array.isArray(other)
            ? new RoundedVector3D(other).valueRounded
            : other.valueRounded;
        const atol = RoundedVector3D.atol || 10 ** -RoundedVector3D.roundPrecision;
        return math.vEqualWithTolerance(arr1, arr2, atol);
    }

    get normRounded(): number {
        return math.roundArrayOrNumber(this.norm, RoundedVector3D.roundPrecision) as number;
    }
}
