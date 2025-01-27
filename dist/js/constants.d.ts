export namespace coefficients {
    let EV_TO_RY: number;
    let BOHR_TO_ANGSTROM: number;
    let ANGSTROM_TO_BOHR: number;
    let EV_A_TO_RY_BOHR: number;
}
export namespace tolerance {
    let length: number;
    let lengthAngstrom: number;
    let pointsDistance: number;
}
export namespace units {
    let bohr: string;
    let angstrom: string;
    let degree: string;
    let radian: string;
    let alat: string;
}
export namespace ATOMIC_COORD_UNITS {
    let crystal: string;
    let cartesian: string;
}
export const HASH_TOLERANCE: 3;
declare namespace _default {
    export { coefficients };
    export { tolerance };
    export { units };
    export { ATOMIC_COORD_UNITS };
}
export default _default;
