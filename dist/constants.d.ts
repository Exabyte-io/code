export namespace coefficients {
    const EV_TO_RY: number;
    const BOHR_TO_ANGSTROM: number;
    const ANGSTROM_TO_BOHR: number;
    const EV_A_TO_RY_BOHR: number;
}
export namespace tolerance {
    const length: number;
    const lengthAngstrom: number;
    const pointsDistance: number;
}
export namespace units {
    const bohr: string;
    const angstrom: string;
    const degree: string;
    const radian: string;
    const alat: string;
}
export namespace ATOMIC_COORD_UNITS {
    const crystal: string;
    const cartesian: string;
}
export const HASH_TOLERANCE: 3;
declare namespace _default {
    export { coefficients };
    export { tolerance };
    export { units };
    export { ATOMIC_COORD_UNITS };
}
export default _default;
