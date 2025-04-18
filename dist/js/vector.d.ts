import { PointSchema } from "@mat3ra/esse/dist/js/types";
export declare class Vector3D {
    static atol: number;
    private _value;
    constructor(value: number[] | PointSchema);
    get value(): PointSchema;
    get x(): number;
    get y(): number;
    get z(): number;
    equals(other: number[] | PointSchema | Vector3D): boolean;
    get norm(): number;
}
export declare class RoundedVector3D extends Vector3D {
    static roundPrecision: number;
    toJSON(skipRounding?: boolean): PointSchema;
    get value_rounded(): PointSchema;
    get x_rounded(): number;
    get y_rounded(): number;
    get z_rounded(): number;
    equals(other: PointSchema | RoundedVector3D): boolean;
    get norm_rounded(): number;
}
