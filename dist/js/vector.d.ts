import { Vector3DSchema } from "@mat3ra/esse/dist/js/types";
export declare class Vector3D {
    static atol: number;
    private _value;
    constructor(value: number[] | Vector3DSchema);
    get value(): Vector3DSchema;
    get x(): number;
    get y(): number;
    get z(): number;
    equals(other: number[] | Vector3DSchema | Vector3D): boolean;
    get norm(): number;
}
export declare class RoundedVector3D extends Vector3D {
    static roundPrecision: number;
    toJSON(skipRounding?: boolean): Vector3DSchema;
    get value_rounded(): Vector3DSchema;
    get x_rounded(): number;
    get y_rounded(): number;
    get z_rounded(): number;
    equals(other: Vector3DSchema | RoundedVector3D): boolean;
    get norm_rounded(): number;
}
