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
    translateByVector(vector: Vector3DSchema | Vector3D): Vector3D;
}
export declare class RoundedVector3D extends Vector3D {
    static roundPrecision: number;
    toJSON(skipRounding?: boolean): Vector3DSchema;
    get valueRounded(): Vector3DSchema;
    get xRounded(): number;
    get yRounded(): number;
    get zRounded(): number;
    equals(other: Vector3DSchema | RoundedVector3D): boolean;
    get normRounded(): number;
}
